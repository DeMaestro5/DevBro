import { logger } from '../../utils/logger.js';
import { AIResponse } from '../../types/ai.types.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Logger from '../../helpers/Logger.js';

export class AIClient {
  private genAI: GoogleGenerativeAI;
  private model: string = 'gemini-1.5-flash'; // Free model

  constructor() {
    if (!process.env.AI_API_KEY) {
      throw new Error('AI Api key is not configured');
    }
    this.genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
    Logger.info('AI Client initialized');
  }

  async generateMessage(
    activity: any,
    tone: string = 'encouraging',
  ): Promise<AIResponse> {
    try {
      logger.info(`Generating AI message with tone: ${tone}`);
      const model = this.genAI.getGenerativeModel({ model: this.model });
      const systemPrompt = this.buildSystemPrompt();
      const userPrompt = this.buildUserPrompt(activity, tone);
      const result = await model.generateContent([systemPrompt, userPrompt]);
      const message =
        result?.response.text?.().trim() || 'Keep coding! You got this! 💪';

      return {
        message,
        tone,
        messageType: 'daily',
      };
    } catch (error) {
      logger.error('Error generating AI message:', error);
      // fallback message if Ai fails
      return {
        message: 'Keep pushing! Every commit counts',
        tone,
        messageType: 'daily',
      };
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

  private buildSystemPrompt(): string {
    return `You are DevBro, a competitive but friendly coding rival and companion.
    
    Your personality: 
    - Competitive: You like to compare your progress with the user
    - Motivating: You push them to code more and improve
    - Friendly: You're supportive, never mean or discouraging
    - Concise: Keep message short and punchy (under 200 characters)
    
    Your response should: 
    - Feel personal and natural
    - Include friendly competition
    - Motivate them to keep coding
    - Occasionally tease them (gently)
    - Celebrate their wins
    - Call out their slumps (kindly)
    `;
  }

  private buildUserPrompt(activity: any, tone: string): string {
    const { commits, pull_requests, issues } = activity;

    let prompt = `Today's activity: 
    - Commits: ${commits}
    - Pull Requests : ${pull_requests}
    - Issues: ${issues}
    
    Generate a ${tone} message based on this activity.`;

    if (tone === 'encouraging') {
      prompt += '\nBe supportive and motivating. Celebrate their progress.';
    } else if (tone === 'challenging') {
      prompt +=
        '\nBe competitive. Compare their stats to what you did (make up higher numbers). Push them to do better.';
    } else if (tone === 'teasing') {
      prompt +=
        '\nBe playfully tease about low numbers. Keep friendly and funny.';
    }

    prompt += '\n\nResponse with ONLY the message, nothing else';
    return prompt;
  }
}
