"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordService = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
const logger_1 = require("../../utils/logger");
class DiscordService {
    constructor() {
        this.webhookUrl = env_1.config.discord.webhookUrl;
    }
    async sendMessage(options) {
        try {
            logger_1.logger.info('Sending Discord message...');
            const payload = {
                embeds: [{
                        title: options.title,
                        description: options.content,
                        color: options.color,
                        timestamp: new Date().toISOString()
                    }]
            };
            await axios_1.default.post(this.webhookUrl, payload);
            logger_1.logger.info('Discord message sent successfully');
        }
        catch (error) {
            logger_1.logger.error('Error sending Discord message:', error);
            throw error;
        }
    }
}
exports.DiscordService = DiscordService;
//# sourceMappingURL=discordService.js.map