import nodemailer from 'nodemailer';
import { config } from '../../config/env.js';
import { logger } from '../../utils/logger.js';
export class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email.user,
                pass: config.email.pass,
            },
        });
    }
    async sendEmail(options) {
        try {
            logger.info(`Sending email to ${options.to}...`);
            const mailOptions = {
                from: config.email.user,
                to: options.to,
                subject: options.subject,
                text: options.text,
            };
            await this.transporter.sendMail(mailOptions);
            logger.info('Email sent successfully');
        }
        catch (error) {
            logger.error('Error sending email:', error);
            throw error;
        }
    }
    getConfig() {
        return config.email;
    }
}
//# sourceMappingURL=emailService.js.map