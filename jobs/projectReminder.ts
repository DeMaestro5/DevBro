import { ProjectModel } from '../models/Project.js';
import { NotificationService } from '../services/notifications/notificationService.js';
import { logger } from '../utils/logger.js';

export class ProjectReminderJob {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  async execute(): Promise<void> {
    try {
      logger.info('Executing project reminder job...');

      const staleProjects = ProjectModel.findStale();

      if (staleProjects.length > 0) {
        const projectList = staleProjects.map((p) => `• ${p.name}`).join('\n');

        await this.notificationService.sendNotification({
          title: '🔔 Project Reminder',
          content: `You have ${staleProjects.length} stale projects that need attention:\n\n${projectList}\n\nTime to get back to coding! 💻`,
          type: 'reminder',
          priority: 'medium',
        });
      }

      logger.info(`Sent reminders for ${staleProjects.length} stale projects`);
    } catch (error) {
      logger.error('Error in project reminder job:', error);
      throw error;
    }
  }
}
