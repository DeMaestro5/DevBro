import { logger } from '../utils/logger';
import { NotificationMessage } from '../types/notification.types';
import { EmailService } from './emailService';
import { DiscordService } from './discordService';

export class NotificationService {
  private emailService: EmailService;
  private discordService: DiscordService;
  
  constructor() {
    this.emailService = new EmailService();
    this.discordService = new DiscordService();
  }
  
  async sendNotification(message: NotificationMessage): Promise<void> {
    try {
      logger.info(`Sending notification: ${message.title}`);
      
      // Send email notification
      await this.emailService.sendEmail({
        to: this.emailService.getConfig().to,
        subject: message.title,
        text: message.content
      });
      
      // Send Discord notification
      await this.discordService.sendMessage({
        title: message.title,
        content: message.content,
        color: this.getColorByType(message.type)
      });
      
      logger.info('Notification sent successfully');
    } catch (error) {
      logger.error('Error sending notification:', error);
      throw error;
    }
  }
  
  private getColorByType(type: string): number {
    switch (type) {
      case 'motivational': return 0x00ff00; // Green
      case 'challenge': return 0xffaa00; // Orange
      case 'achievement': return 0x0099ff; // Blue
      case 'reminder': return 0xff6600; // Red
      default: return 0x666666; // Gray
    }
  }
}
