import { ActivityMonitor } from '../services/github/activityMonitor';
import { AIClient } from '../services/ai/aiClient';
import { NotificationService } from '../services/notifications/notificationService';
import { RivalMessageModel } from '../models/RivalMessage';
import { logger } from '../utils/logger';

export class DailyCheckJob {
  private activityMonitor: ActivityMonitor;
  private aiClient: AIClient;
  private notificationService: NotificationService;

  constructor() {
    this.activityMonitor = new ActivityMonitor();
    this.aiClient = new AIClient();
    this.notificationService = new NotificationService();
  }

  async execute(): Promise<void> {
    try {
      logger.info('Executing daily check job...');

      // Monitor daily activity
      const activity = await this.activityMonitor.monitorDailyActivity();

      // Update project status
      await this.activityMonitor.updateProjectStatus();

      // Generate AI message based on activity
      const context = `Today's activity: ${activity.commits} commits, ${activity.pull_requests} PRs, ${activity.issues} issues`;
      const aiResponse = await this.aiClient.generateMessage(
        context,
        'encouraging',
      );

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
        type: aiResponse.messageType as any,
        priority: 'medium',
      });

      logger.info('Daily check job completed successfully');
    } catch (error) {
      logger.error('Error in daily check job:', error);
      throw error;
    }
  }
}
