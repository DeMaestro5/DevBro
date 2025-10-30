import { githubClient } from './githubClient.js';
import { ActivityModel } from '../../models/Activity.js';
import { ProjectModel } from '../../models/Project.js';
import { logger } from '../../utils/logger.js';
import { DateHelper } from '../../utils/dateHelper.js';
export class ActivityMonitor {
    constructor() {
        this.githubClient = githubClient;
    }
    async monitorDailyActivity() {
        try {
            logger.info('Starting daily activity monitoring...');
            const yesterday = DateHelper.getYesterday();
            const existingActivity = ActivityModel.findByDate(yesterday);
            if (existingActivity) {
                logger.info('Activity already recorded for yesterday');
                return existingActivity;
            }
            const activityStats = await this.githubClient.fetchActivityStat(yesterday);
            console.log(activityStats);
            const activity = ActivityModel.create(activityStats);
            logger.info(`Recorded activity for ${yesterday}:`, activity);
            return activity;
        }
        catch (error) {
            logger.error('Error monitoring daily activity:', error);
            throw error;
        }
    }
    async updateProjectStatus() {
        try {
            logger.info('Updating project status...');
            const projects = ProjectModel.findAll();
            const staleThreshold = 30; // days
            for (const project of projects) {
                if (project.last_commit_date) {
                    const isStale = DateHelper.isStale(project.last_commit_date, staleThreshold);
                    if (project.is_stale !== (isStale ? 1 : 0)) {
                        ProjectModel.update(project.id, { is_stale: isStale ? 1 : 0 });
                        logger.info(`Updated project ${project.name} stale status: ${isStale}`);
                    }
                }
            }
        }
        catch (error) {
            logger.error('Error updating project status:', error);
            throw error;
        }
    }
    async syncRepositories() {
        try {
            logger.info('Syncing repositories...');
            const repos = await this.githubClient.FetchUserRepo();
            for (const repo of repos) {
                const existingProject = ProjectModel.findByName(repo.name);
                if (existingProject) {
                    // Update existing project
                    ProjectModel.update(existingProject.id, {
                        repo_url: repo.html_url,
                        language: repo.language,
                        last_commit_date: repo.pushed_at,
                        is_stale: repo.pushed_at
                            ? DateHelper.isStale(repo.pushed_at)
                                ? 1
                                : 0
                            : 0,
                    });
                }
                else {
                    // Create new project
                    ProjectModel.create({
                        name: repo.name,
                        repo_url: repo.html_url,
                        language: repo.language,
                        last_commit_date: repo.pushed_at,
                        is_stale: repo.pushed_at
                            ? DateHelper.isStale(repo.pushed_at)
                                ? 1
                                : 0
                            : 0,
                    });
                }
            }
            logger.info(`Synced ${repos.length} repositories`);
        }
        catch (error) {
            logger.error('Error syncing repositories:', error);
            throw error;
        }
    }
}
//# sourceMappingURL=activityMonitor.js.map