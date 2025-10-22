import axios, { AxiosInstance } from 'axios';
import { config } from '../../config/env';
import { logger } from '../../utils/logger';
import {
  GitHubUser,
  GitHubRepo,
  GitHubCommit,
  GitHubActivity,
} from '../../types/github.types';

export class GitHubClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `token ${config.github.token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'DevBro/1.0',
      },
    });
  }

  async getUserInfo(): Promise<GitHubUser> {
    try {
      logger.info('Fetching GitHub user info...');
      const response = await this.client.get(
        `/users/${config.github.username}`,
      );
      return response.data;
    } catch (error) {
      logger.error('Error fetching user info:', error);
      throw error;
    }
  }

  async getUserRepos(): Promise<GitHubRepo[]> {
    try {
      logger.info('Fetching user repositories...');
      const response = await this.client.get(
        `/users/${config.github.username}/repos?sort=updated&per_page=100`,
      );
      return response.data;
    } catch (error) {
      logger.error('Error fetching repositories:', error);
      throw error;
    }
  }

  async getRepoCommits(
    repoName: string,
    since?: string,
  ): Promise<GitHubCommit[]> {
    try {
      logger.info(`Fetching commits for repository: ${repoName}`);
      const url = `/repos/${config.github.username}/${repoName}/commits`;
      const params = since ? { since } : {};
      const response = await this.client.get(url, { params });
      return response.data;
    } catch (error) {
      logger.error(`Error fetching commits for ${repoName}:`, error);
      throw error;
    }
  }

  async getActivityStats(since: string): Promise<GitHubActivity> {
    try {
      logger.info(`Fetching activity stats since ${since}...`);

      const repos = await this.getUserRepos();
      let totalCommits = 0;
      let totalAdditions = 0;
      let totalDeletions = 0;

      for (const repo of repos) {
        try {
          const commits = await this.getRepoCommits(repo.name, since);
          totalCommits += commits.length;

          // TODO: Calculate additions and deletions from commit details
          // This would require fetching individual commit details
        } catch (error) {
          logger.warn(`Error processing repo ${repo.name}:`, error);
        }
      }

      return {
        date: since,
        commits: totalCommits,
        pull_requests: 0, // TODO: Implement PR tracking
        issues: 0, // TODO: Implement issue tracking
        additions: totalAdditions,
        deletions: totalDeletions,
      };
    } catch (error) {
      logger.error('Error fetching activity stats:', error);
      throw error;
    }
  }
}
