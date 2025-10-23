"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../../config/env");
const logger_1 = require("../../utils/logger");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: env_1.config.email.user,
                pass: env_1.config.email.pass,
            },
        });
    }
    async sendEmail(options) {
        try {
            logger_1.logger.info(`Sending email to ${options.to}...`);
            const mailOptions = {
                from: env_1.config.email.user,
                to: options.to,
                subject: options.subject,
                text: options.text,
            };
            await this.transporter.sendMail(mailOptions);
            logger_1.logger.info('Email sent successfully');
        }
        catch (error) {
            logger_1.logger.error('Error sending email:', error);
            throw error;
        }
    }
    getConfig() {
        return env_1.config.email;
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=emailService.js.map