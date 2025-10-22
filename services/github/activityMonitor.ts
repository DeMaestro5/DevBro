import { GitHubClient } from './githubClient';
import { ActivityModel, Activity } from '../models/Activity';
import { ProjectModel, Project } from '../models/Project';
import { logger } from '../utils/logger';
import { DateHelper } from '../utils/dateHelper';

export class ActivityMonitor {
  private githubClient: GitHubClient;

  constructor() {
    this.githubClient = new GitHubClient();
  }

  async monitorDailyActivity(): Promise<Activity> {
    try {
      logger.info('Starting daily activity monitoring...');

      const yesterday = DateHelper.getYesterday();
      const existingActivity = ActivityModel.findByDate(yesterday);

      if (existingActivity) {
        logger.info('Activity already recorded for yesterday');
        return existingActivity;
      }

      const activityStats = await this.githubClient.getActivityStats(yesterday);
      const activity = ActivityModel.create(activityStats);

      logger.info(`Recorded activity for ${yesterday}:`, activity);
      return activity;
    } catch (error) {
      logger.error('Error monitoring daily activity:', error);
      throw error;
    }
  }

  async updateProjectStatus(): Promise<void> {
    try {
      logger.info('Updating project status...');

      const projects = ProjectModel.findAll();
      const staleThreshold = 30; // days

      for (const project of projects) {
        if (project.last_commit_date) {
          const isStale = DateHelper.isStale(
            project.last_commit_date,
            staleThreshold,
          );
          if (project.is_stale !== (isStale ? 1 : 0)) {
            ProjectModel.update(project.id!, { is_stale: isStale ? 1 : 0 });
            logger.info(
              `Updated project ${project.name} stale status: ${isStale}`,
            );
          }
        }
      }
    } catch (error) {
      logger.error('Error updating project status:', error);
      throw error;
    }
  }

  async syncRepositories(): Promise<void> {
    try {
      logger.info('Syncing repositories...');

      const repos = await this.githubClient.getUserRepos();

      for (const repo of repos) {
        const existingProject = ProjectModel.findByName(repo.name);

        if (existingProject) {
          // Update existing project
          ProjectModel.update(existingProject.id!, {
            repo_url: repo.html_url,
            language: repo.language,
            last_commit_date: repo.pushed_at,
            is_stale: DateHelper.isStale(repo.pushed_at) ? 1 : 0,
          });
        } else {
          // Create new project
          ProjectModel.create({
            name: repo.name,
            repo_url: repo.html_url,
            language: repo.language,
            last_commit_date: repo.pushed_at,
            is_stale: DateHelper.isStale(repo.pushed_at) ? 1 : 0,
          });
        }
      }

      logger.info(`Synced ${repos.length} repositories`);
    } catch (error) {
      logger.error('Error syncing repositories:', error);
      throw error;
    }
  }
}
