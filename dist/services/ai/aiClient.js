"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIClient = void 0;
// import axios from 'axios';
const env_1 = require("../../config/env");
const logger_1 = require("../../utils/logger");
const Logger_1 = __importDefault(require("../../src/helpers/Logger"));
class AIClient {
    constructor() {
        this.apiKey = env_1.config.ai.apiKey;
    }
    async generateMessage(context, tone = 'encouraging') {
        try {
            logger_1.logger.info('Generating AI message...');
            const messages = [
                {
                    role: 'system',
                    content: `You are DevBro, a motivational developer rival. Generate ${tone} messages to encourage coding activity. Keep messages under 200 characters.`,
                },
                {
                    role: 'user',
                    content: context,
                },
            ];
            Logger_1.default.info('Ai Response', messages);
            // TODO: Implement actual AI API call
            // This is a placeholder implementation
            const mockResponse = {
                message: `Hey! I see you've been coding. ${tone === 'challenging' ? 'But I bet I can code better!' : 'Keep up the great work!'}`,
                tone,
                messageType: 'motivational',
            };
            logger_1.logger.info('Generated AI message:', mockResponse);
            return mockResponse;
        }
        catch (error) {
            logger_1.logger.error('Error generating AI message:', error);
            throw error;
        }
    }
    async generateChallenge(activity) {
        try {
            logger_1.logger.info('Generating coding challenge...');
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
            logger_1.logger.info('Generated challenge:', mockChallenge);
            return mockChallenge;
        }
        catch (error) {
            logger_1.logger.error('Error generating challenge:', error);
            throw error;
        }
    }
}
exports.AIClient = AIClient;
//# sourceMappingURL=aiClient.js.map