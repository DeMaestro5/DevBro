import axios from 'axios';
import { config } from '../config/env';
import { logger } from '../utils/logger';

export class DiscordService {
  private webhookUrl: string;
  
  constructor() {
    this.webhookUrl = config.discord.webhookUrl;
  }
  
  async sendMessage(options: { title: string; content: string; color: number }): Promise<void> {
    try {
      logger.info('Sending Discord message...');
      
      const payload = {
        embeds: [{
          title: options.title,
          description: options.content,
          color: options.color,
          timestamp: new Date().toISOString()
        }]
      };
      
      await axios.post(this.webhookUrl, payload);
      logger.info('Discord message sent successfully');
    } catch (error) {
      logger.error('Error sending Discord message:', error);
      throw error;
    }
  }
}
