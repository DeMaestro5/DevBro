"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeklyReportJob = void 0;
const Activity_1 = require("../models/Activity");
const Project_1 = require("../models/Project");
const Challenge_1 = require("../models/Challenge");
const notificationService_1 = require("../services/notifications/notificationService");
const logger_1 = require("../utils/logger");
const dateHelper_1 = require("../utils/dateHelper");
class WeeklyReportJob {
    constructor() {
        this.notificationService = new notificationService_1.NotificationService();
    }
    async execute() {
        try {
            logger_1.logger.info('Executing weekly report job...');
            const weekAgo = dateHelper_1.DateHelper.getWeekAgo();
            const activities = Activity_1.ActivityModel.findAll(7);
            // Calculate weekly stats
            const totalCommits = activities.reduce((sum, activity) => sum + activity.commits, 0);
            const totalPRs = activities.reduce((sum, activity) => sum + activity.pull_requests, 0);
            const totalIssues = activities.reduce((sum, activity) => sum + activity.issues, 0);
            // Get project stats
            const totalProjects = Project_1.ProjectModel.findAll().length;
            const staleProjects = Project_1.ProjectModel.findStale().length;
            // Get challenge stats
            const activeChallenges = Challenge_1.ChallengeModel.findActive().length;
            const completedChallenges = Challenge_1.ChallengeModel.findCompleted().length;
            // Generate report content
            const reportContent = `
📊 **Weekly DevBro Report**

**Activity Summary:**
• Commits: ${totalCommits}
• Pull Requests: ${totalPRs}
• Issues: ${totalIssues}

**Project Status:**
• Total Projects: ${totalProjects}
• Stale Projects: ${staleProjects}

**Challenges:**
• Active: ${activeChallenges}
• Completed: ${completedChallenges}

Keep up the great work! 🚀
      `.trim();
            // Send weekly report
            await this.notificationService.sendNotification({
                title: '📊 Weekly DevBro Report',
                content: reportContent,
                type: 'achievement',
                priority: 'low'
            });
            logger_1.logger.info('Weekly report job completed successfully');
        }
        catch (error) {
            logger_1.logger.error('Error in weekly report job:', error);
            throw error;
        }
    }
}
exports.WeeklyReportJob = WeeklyReportJob;
//# sourceMappingURL=weeklyReport.js.map