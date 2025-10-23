import { Octokit } from '@octokit/rest';
import Logger from '../../src/helpers/Logger';
import { GitHubCommit, GitHubRepo, GitHubUser } from '../../types/github.types';
import { RequestError } from '@octokit/request-error';
import { Activity } from '../../models/Activity';

class GithubClient {
  private octokit: Octokit;

  constructor() {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('Github token is not set');
    }
    if (!process.env.GITHUB_USERNAME) {
      throw new Error('Github username is not set');
    }

    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.octokit.rateLimit.get();
      return true;
    } catch (error) {
      Logger.warn('Github health check failed', error);
      return false;
    }
  }

  async fetchProfile(): Promise<GitHubUser> {
    try {
      Logger.info('Fetching Github Profile');

      const response = await this.octokit.rest.users.getByUsername({
        username: process.env.GITHUB_USERNAME!,
      });

      const profile: GitHubUser = {
        login: response.data.login,
        id: response.data.id,
        avatar_url: response.data.avatar_url,
        html_url: response.data.html_url,
        public_repos: response.data.public_repos,
        followers: response.data.followers,
        following: response.data.following,
      };

      Logger.info('GitHub Profile Fetched Successfully', {
        login: profile.login,
        repos: profile.public_repos,
        followers: profile.followers,
      });

      return profile;
    } catch (error) {
      if (error instanceof RequestError) {
        Logger.error('Failed to fetch GitHub profile', {
          error: error.message,
          status: error.status,
          rateLimit: error.response?.headers?.['x-ratelimit-remaining'],
        });
        throw new Error(`GitHub API error: ${error.message}`);
      }

      Logger.error('Unexpected error while fetching GitHub profile', error);
      throw error;
    }
  }

  async FetchUserRepo(): Promise<GitHubRepo[]> {
    Logger.info('Fetching Github Repo');
    try {
      const response = await this.octokit.rest.repos.listForUser({
        username: process.env.GITHUB_USERNAME!,
      });

      const repositories: GitHubRepo[] = response.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        description: repo.description,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
      }));

      Logger.info('Github Repositories Fetched Successfully', {
        repositories: repositories.length,
      });
      return repositories;
    } catch (error) {
      if (error instanceof RequestError) {
        Logger.error('Failed to fetch GitHub Repo', {
          error: error.message,
          status: error.status,
          rateLimit: error.response?.headers?.['x-ratelimit-remaining'],
        });
        throw new Error(`GitHub API error: ${error.message}`);
      }

      Logger.error('Unexpected error while fetching GitHub Repo', error);
      throw error;
    }
  }

  async FetchRepoCommits(name: string): Promise<GitHubCommit[]> {
    try {
      Logger.info('Fetching Github Commits');

      const [owner, repo] = name.split('/');
      if (!owner || !repo) {
        throw new Error(
          `Invalid repo name format: "${name}". Expected "owner/repo".`,
        );
      }

      const response = await this.octokit.rest.repos.listCommits({
        owner,
        repo,
      });

      const commits: GitHubCommit[] = response.data.map((commit) => ({
        sha: commit.sha,
        commit: {
          message: commit.commit.message,
          author: {
            name: commit.commit.author?.name,
            email: commit.commit.author?.email,
            date: commit.commit.author?.date,
          },
        },
        html_url: commit.html_url,
      }));
      Logger.info('Commits fetched successfully', {
        commits: commits.length,
      });
      return commits;
    } catch (error) {
      if (error instanceof RequestError) {
        Logger.error('Failed to fetch GitHub commits', {
          error: error.message,
          status: error.status,
          rateLimit: error.response?.headers?.['x-ratelimit-remaining'],
        });
        throw new Error(`GitHub API error: ${error.message}`);
      }

      Logger.error('Unexpected error while fetching GitHub commits', error);
      throw error;
    }
  }
  async fetchActivityStat(since: string): Promise<Activity> {
    try {
      Logger.info(`Fetching Github Activity Stats since: ${since}`);

      const { data: events } =
        await this.octokit.rest.activity.listEventsForAuthenticatedUser({
          username: process.env.GITHUB_USERNAME!,
          per_page: 100,
        });

      const sinceDate = new Date(since);
      const recentEvents = events.filter((event) => {
        const eventDate = new Date(event.created_at || '');
        return eventDate >= sinceDate;
      });

      Logger.info(`Found ${recentEvents.length} events since ${since}`);

      let totalCommits = 0;
      let totalPullRequests = 0;
      let totalIssue = 0;
      let totalAdditions = 0;
      let totalDeletions = 0;

      for (const event of recentEvents) {
        if (event.type === 'PushEvent' && 'commits' in (event.payload || {})) {
          const payload = event.payload as { commits: Array<{ sha: string }> };
          const commits = payload.commits;
          totalCommits += commits.length;

          for (const commit of commits) {
            try {
              const [owner, repo] = event.repo.name.split('/');
              const { data: commitDetail } =
                await this.octokit.rest.repos.getCommit({
                  owner,
                  repo,
                  ref: commit.sha,
                });
              totalAdditions += commitDetail.stats?.additions || 0;
              totalDeletions += commitDetail.stats?.deletions || 0;
            } catch (err) {
              Logger.warn(`Failed to fetch commit details for ${commit.sha}`);
            }
          }
        }

        if (event.type === 'PullRequestEvent') {
          totalPullRequests++;
        }
        if (event.type === 'IssuesEvent') {
          totalIssue++;
        }
      }
      const activityStats: Activity = {
        date: since,
        commits: totalCommits,
        pull_requests: totalPullRequests,
        issues: totalIssue,
        total_additions: totalAdditions,
        total_deletions: totalDeletions,
      };

      Logger.info('Activity stats calculated:', activityStats);
      return activityStats;
    } catch (error) {
      if (error instanceof RequestError) {
        Logger.error('Failed to fetch GitHub Activity', {
          error: error.message,
          status: error.status,
          rateLimit: error.response?.headers?.['x-ratelimit-remaining'],
        });
        throw new Error(`GitHub API error: ${error.message}`);
      }

      Logger.error('Unexpected error while fetching GitHub Activity', error);
      throw error;
    }
  }
}
export const githubClient = new GithubClient();
