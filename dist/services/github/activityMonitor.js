"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityMonitor = void 0;
const githubClient_1 = require("./githubClient");
const Activity_1 = require("../../models/Activity");
const Project_1 = require("../../models/Project");
const logger_1 = require("../../utils/logger");
const dateHelper_1 = require("../../utils/dateHelper");
class ActivityMonitor {
    constructor() {
        this.githubClient = githubClient_1.githubClient;
    }
    async monitorDailyActivity() {
        try {
            logger_1.logger.info('Starting daily activity monitoring...');
            const yesterday = dateHelper_1.DateHelper.getYesterday();
            const existingActivity = Activity_1.ActivityModel.findByDate(yesterday);
            if (existingActivity) {
                logger_1.logger.info('Activity already recorded for yesterday');
                return existingActivity;
            }
            const activityStats = await this.githubClient.fetchActivityStat(yesterday);
            console.log(activityStats);
            const activity = Activity_1.ActivityModel.create(activityStats);
            logger_1.logger.info(`Recorded activity for ${yesterday}:`, activity);
            return activity;
        }
        catch (error) {
            logger_1.logger.error('Error monitoring daily activity:', error);
            throw error;
        }
    }
    async updateProjectStatus() {
        try {
            logger_1.logger.info('Updating project status...');
            const projects = Project_1.ProjectModel.findAll();
            const staleThreshold = 30; // days
            for (const project of projects) {
                if (project.last_commit_date) {
                    const isStale = dateHelper_1.DateHelper.isStale(project.last_commit_date, staleThreshold);
                    if (project.is_stale !== (isStale ? 1 : 0)) {
                        Project_1.ProjectModel.update(project.id, { is_stale: isStale ? 1 : 0 });
                        logger_1.logger.info(`Updated project ${project.name} stale status: ${isStale}`);
                    }
                }
            }
        }
        catch (error) {
            logger_1.logger.error('Error updating project status:', error);
            throw error;
        }
    }
    async syncRepositories() {
        try {
            logger_1.logger.info('Syncing repositories...');
            const repos = await this.githubClient.FetchUserRepo();
            for (const repo of repos) {
                const existingProject = Project_1.ProjectModel.findByName(repo.name);
                if (existingProject) {
                    // Update existing project
                    Project_1.ProjectModel.update(existingProject.id, {
                        repo_url: repo.html_url,
                        language: repo.language,
                        last_commit_date: repo.pushed_at,
                        is_stale: repo.pushed_at
                            ? dateHelper_1.DateHelper.isStale(repo.pushed_at)
                                ? 1
                                : 0
                            : 0,
                    });
                }
                else {
                    // Create new project
                    Project_1.ProjectModel.create({
                        name: repo.name,
                        repo_url: repo.html_url,
                        language: repo.language,
                        last_commit_date: repo.pushed_at,
                        is_stale: repo.pushed_at
                            ? dateHelper_1.DateHelper.isStale(repo.pushed_at)
                                ? 1
                                : 0
                            : 0,
                    });
                }
            }
            logger_1.logger.info(`Synced ${repos.length} repositories`);
        }
        catch (error) {
            logger_1.logger.error('Error syncing repositories:', error);
            throw error;
        }
    }
}
exports.ActivityMonitor = ActivityMonitor;
//# sourceMappingURL=activityMonitor.js.map