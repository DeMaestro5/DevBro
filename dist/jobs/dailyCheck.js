"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyCheckJob = void 0;
const activityMonitor_1 = require("../services/github/activityMonitor");
const aiClient_1 = require("../services/ai/aiClient");
const notificationService_1 = require("../services/notifications/notificationService");
const RivalMessage_1 = require("../models/RivalMessage");
const logger_1 = require("../utils/logger");
class DailyCheckJob {
    constructor() {
        this.activityMonitor = new activityMonitor_1.ActivityMonitor();
        this.aiClient = new aiClient_1.AIClient();
        this.notificationService = new notificationService_1.NotificationService();
    }
    async execute() {
        try {
            logger_1.logger.info('Executing daily check job...');
            // Monitor daily activity
            const activity = await this.activityMonitor.monitorDailyActivity();
            // Update project status
            await this.activityMonitor.updateProjectStatus();
            // Generate AI message based on activity
            const context = `Today's activity: ${activity.commits} commits, ${activity.pull_requests} PRs, ${activity.issues} issues`;
            const aiResponse = await this.aiClient.generateMessage(context, 'encouraging');
            // Save rival message
            RivalMessage_1.RivalMessageModel.create({
                message: aiResponse.message,
                message_type: aiResponse.messageType,
                tone: aiResponse.tone,
                activity_id: activity.id
            });
            // Send notification
            await this.notificationService.sendNotification({
                title: 'DevBro Daily Check',
                content: aiResponse.message,
                type: aiResponse.messageType,
                priority: 'medium'
            });
            logger_1.logger.info('Daily check job completed successfully');
        }
        catch (error) {
            logger_1.logger.error('Error in daily check job:', error);
            throw error;
        }
    }
}
exports.DailyCheckJob = DailyCheckJob;
//# sourceMappingURL=dailyCheck.js.map