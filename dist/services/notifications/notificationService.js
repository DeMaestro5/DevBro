"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const logger_1 = require("../../utils/logger");
const emailService_1 = require("./emailService");
const discordService_1 = require("./discordService");
class NotificationService {
    constructor() {
        this.emailService = new emailService_1.EmailService();
        this.discordService = new discordService_1.DiscordService();
    }
    async sendNotification(message) {
        try {
            logger_1.logger.info(`Sending notification: ${message.title}`);
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
            logger_1.logger.info('Notification sent successfully');
        }
        catch (error) {
            logger_1.logger.error('Error sending notification:', error);
            throw error;
        }
    }
    getColorByType(type) {
        switch (type) {
            case 'motivational': return 0x00ff00; // Green
            case 'challenge': return 0xffaa00; // Orange
            case 'achievement': return 0x0099ff; // Blue
            case 'reminder': return 0xff6600; // Red
            default: return 0x666666; // Gray
        }
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notificationService.js.map