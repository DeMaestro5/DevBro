import { GoogleGenerativeAI } from '@google/generative-ai';
import Logger from '../../helpers/Logger.js';
export class AIClient {
    constructor() {
        this.model = 'gemini-2.5-flash'; // Free model
        if (!process.env.AI_API_KEY) {
            throw new Error('AI Api key is not configured');
        }
        this.genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
        Logger.info('AI Client initialized');
    }
    async generateMessage(activity, tone = 'encouraging') {
        try {
            Logger.info(`Generating AI message with tone: ${tone}`);
            const model = this.genAI.getGenerativeModel({ model: this.model });
            const systemPrompt = this.buildSystemPrompt();
            const userPrompt = this.buildUserPrompt(activity, tone);
            const result = await model.generateContent([systemPrompt, userPrompt]);
            const message = result?.response.text?.().trim() || 'Keep coding! You got this! 💪';
            return {
                message,
                tone,
                messageType: 'daily',
            };
        }
        catch (error) {
            Logger.error('Error generating AI message:', error);
            // fallback message if Ai fails
            return {
                message: 'Keep pushing! Every commit counts',
                tone,
                messageType: 'daily',
            };
        }
    }
    async generateChallenge(activity) {
        try {
            const model = this.genAI.getGenerativeModel({ model: this.model });
            Logger.info('Generating coding challenge...');
            const prompt = `Based on this developer's recent activity: 
       - ${activity.commits} commits
       - ${activity.pull_requests} pull requests
       - ${activity.issues} issues
       
       Generate a coding challenge that will help them improve. Include:
       1. A catchy title
       2. A clear description (2-3 sentences)
       3. Difficulty level (easy/medium/hard)
       4. Estimated time
       5. 3-4 specific requirements

       Format as JSON`;
            const response = await model.generateContent(prompt);
            let result = response?.response?.text().trim() || '';
            result = result
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            try {
                return JSON.parse(result);
            }
            catch {
                Logger.warn('Invalid JSON from model. Returning formatted text.');
                return {
                    title: 'Code Review Challenge',
                    description: result,
                    difficulty: 'medium',
                    estimatedTime: '2-3 hours',
                    requirements: [
                        'Complete the challenge',
                        'Write tests',
                        'Document your code',
                    ],
                };
            }
        }
        catch (error) {
            Logger.error('Error generating challenge:', error);
            throw error;
        }
    }
    buildSystemPrompt() {
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
    buildUserPrompt(activity, tone) {
        const { commits, pull_requests, issues } = activity;
        let prompt = `Today's activity: 
    - Commits: ${commits}
    - Pull Requests : ${pull_requests}
    - Issues: ${issues}
    
    Generate a ${tone} message based on this activity.`;
        if (tone === 'encouraging') {
            prompt += '\nBe supportive and motivating. Celebrate their progress.';
        }
        else if (tone === 'challenging') {
            prompt +=
                '\nBe competitive. Compare their stats to what you did (make up higher numbers). Push them to do better.';
        }
        else if (tone === 'teasing') {
            prompt +=
                '\nBe playfully tease about low numbers. Keep friendly and funny.';
        }
        prompt += '\n\nResponse with ONLY the message, nothing else';
        return prompt;
    }
}
//# sourceMappingURL=aiClient.js.map