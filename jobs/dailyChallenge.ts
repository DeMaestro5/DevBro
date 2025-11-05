import { ActivityMonitor } from '../services/github/activityMonitor.js';
import { AIClient } from '../services/ai/aiClient.js';
import { NotificationService } from '../services/notifications/notificationService.js';
// import { RivalMessageModel } from '../models/RivalMessage.js';
import { logger } from '../utils/logger.js';
import { formatChallengeToText } from '../helpers/formatChallengeToText.js';

export class DailyChallengeJob {
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

      const aiResponse = await this.aiClient.generateChallenge(activity);
      console.log(aiResponse);

      // // Save rival message
      // RivalMessageModel.create({
      //   message: aiResponse.message,
      //   message_type: aiResponse.messageType,
      //   tone: aiResponse.tone,
      //   activity_id: activity.id,
      // });

      // Send notification
      await this.notificationService.sendNotification({
        title: 'DevBro Daily Challenge',
        content: formatChallengeToText(aiResponse),
        type: aiResponse.messageType as any,
        priority: 'medium',
      });

      logger.info('Daily challenge job completed successfully');
    } catch (error) {
      logger.error('Error in daily challenge job:', error);
      throw error;
    }
  }
}
