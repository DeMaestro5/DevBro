import { ActivityMonitor } from '../services/github/activityMonitor.js';
import { AIClient } from '../services/ai/aiClient.js';
import { NotificationService } from '../services/notifications/notificationService.js';
import { RivalMessageModel } from '../models/RivalMessage.js';
import { logger } from '../utils/logger.js';
export class DailyCheckJob {
    constructor() {
        this.activityMonitor = new ActivityMonitor();
        this.aiClient = new AIClient();
        this.notificationService = new NotificationService();
    }
    async execute() {
        try {
            logger.info('Executing daily check job...');
            // Monitor daily activity
            const activity = await this.activityMonitor.monitorDailyActivity();
            // Update project status
            await this.activityMonitor.updateProjectStatus();
            // Generate tone based on activity
            let tone = 'encouraging';
            if (activity.commits === 0 && activity.pull_requests === 0) {
                tone = 'teasing';
            }
            else if (activity.commits < 3) {
                tone = 'challenging';
            }
            else {
                tone = 'encourage';
            }
            const aiResponse = await this.aiClient.generateMessage(activity, tone);
            // Save rival message
            RivalMessageModel.create({
                message: aiResponse.message,
                message_type: aiResponse.messageType,
                tone: aiResponse.tone,
                activity_id: activity.id,
            });
            // Send notification
            await this.notificationService.sendNotification({
                title: 'DevBro Daily Check',
                content: aiResponse.message,
                type: aiResponse.messageType,
                priority: 'medium',
            });
            logger.info('Daily check job completed successfully');
        }
        catch (error) {
            logger.error('Error in daily check job:', error);
            throw error;
        }
    }
}
//# sourceMappingURL=dailyCheck.js.map