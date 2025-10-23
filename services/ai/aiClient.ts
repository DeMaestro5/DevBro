// import axios from 'axios';
import { config } from '../../config/env';
import { logger } from '../../utils/logger';
import { AIMessage, AIResponse } from '../../types/ai.types';
import Logger from '../../src/helpers/Logger';

export class AIClient {
  private apiKey: string;

  constructor() {
    this.apiKey = config.ai.apiKey;
  }

  async generateMessage(
    context: string,
    tone: string = 'encouraging',
  ): Promise<AIResponse> {
    try {
      logger.info('Generating AI message...');

      const messages: AIMessage[] = [
        {
          role: 'system',
          content: `You are DevBro, a motivational developer rival. Generate ${tone} messages to encourage coding activity. Keep messages under 200 characters.`,
        },
        {
          role: 'user',
          content: context,
        },
      ];
      Logger.info('Ai Response', messages);

      // TODO: Implement actual AI API call
      // This is a placeholder implementation
      const mockResponse: AIResponse = {
        message: `Hey! I see you've been coding. ${tone === 'challenging' ? 'But I bet I can code better!' : 'Keep up the great work!'}`,
        tone,
        messageType: 'motivational',
      };

      logger.info('Generated AI message:', mockResponse);
      return mockResponse;
    } catch (error) {
      logger.error('Error generating AI message:', error);
      throw error;
    }
  }

  async generateChallenge(activity: any): Promise<any> {
    try {
      logger.info('Generating coding challenge...');
      console.log(activity);

      // TODO: Implement challenge generation based on activity
      const mockChallenge = {
        title: 'Code Review Master',
        description: 'Review 3 open source projects and submit meaningful PRs',
        difficulty: 'medium',
        estimatedTime: '2-3 hours',
        requirements: [
          'Find 3 open source projects',
          'Submit at least 1 PR',
          'Write meaningful comments',
        ],
      };

      logger.info('Generated challenge:', mockChallenge);
      return mockChallenge;
    } catch (error) {
      logger.error('Error generating challenge:', error);
      throw error;
    }
  }
}
