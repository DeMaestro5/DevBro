import nodemailer from 'nodemailer';
import { config } from '../config/env';
import { logger } from '../utils/logger';

export class EmailService {
  private transporter: nodemailer.Transporter;
  
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: config.email.user,
        pass: config.email.pass
      }
    });
  }
  
  async sendEmail(options: { to: string; subject: string; text: string }): Promise<void> {
    try {
      logger.info(`Sending email to ${options.to}...`);
      
      const mailOptions = {
        from: config.email.user,
        to: options.to,
        subject: options.subject,
        text: options.text
      };
      
      await this.transporter.sendMail(mailOptions);
      logger.info('Email sent successfully');
    } catch (error) {
      logger.error('Error sending email:', error);
      throw error;
    }
  }
  
  getConfig() {
    return config.email;
  }
}
