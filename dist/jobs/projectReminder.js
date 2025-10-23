"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectReminderJob = void 0;
const Project_1 = require("../models/Project");
const notificationService_1 = require("../services/notifications/notificationService");
const logger_1 = require("../utils/logger");
class ProjectReminderJob {
    constructor() {
        this.notificationService = new notificationService_1.NotificationService();
    }
    async execute() {
        try {
            logger_1.logger.info('Executing project reminder job...');
            const staleProjects = Project_1.ProjectModel.findStale();
            if (staleProjects.length > 0) {
                const projectList = staleProjects.map(p => `• ${p.name}`).join('\n');
                await this.notificationService.sendNotification({
                    title: '🔔 Project Reminder',
                    content: `You have ${staleProjects.length} stale projects that need attention:\n\n${projectList}\n\nTime to get back to coding! 💻`,
                    type: 'reminder',
                    priority: 'medium'
                });
            }
            logger_1.logger.info(`Sent reminders for ${staleProjects.length} stale projects`);
        }
        catch (error) {
            logger_1.logger.error('Error in project reminder job:', error);
            throw error;
        }
    }
}
exports.ProjectReminderJob = ProjectReminderJob;
//# sourceMappingURL=projectReminder.js.map