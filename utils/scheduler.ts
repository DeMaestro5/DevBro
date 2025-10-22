import cron from 'node-cron';
import { logger } from './logger';
import { CRON_SCHEDULES } from '../config/constants';

export class Scheduler {
  private static jobs: Map<string, cron.ScheduledTask> = new Map();

  static startScheduler(): void {
    logger.info('Starting DevBro scheduler...');

    // Daily check at 9 AM
    this.scheduleJob('dailyCheck', CRON_SCHEDULES.DAILY_CHECK, () => {
      logger.info('Running daily check...');
      // TODO: Import and run daily check job
    });

    // Weekly report on Monday at 8 AM
    this.scheduleJob('weeklyReport', CRON_SCHEDULES.WEEKLY_REPORT, () => {
      logger.info('Running weekly report...');
      // TODO: Import and run weekly report job
    });

    // Trend updates every 6 hours
    this.scheduleJob('trendUpdate', CRON_SCHEDULES.TREND_UPDATE, () => {
      logger.info('Updating trends...');
      // TODO: Import and run trend update job
    });

    // Project reminders at 5 PM
    this.scheduleJob('projectReminder', CRON_SCHEDULES.PROJECT_REMINDER, () => {
      logger.info('Sending project reminders...');
      // TODO: Import and run project reminder job
    });

    logger.info('DevBro scheduler started successfully');
  }

  private static scheduleJob(
    name: string,
    schedule: string,
    task: () => void,
  ): void {
    const job = cron.schedule(schedule, task, {
      scheduled: false,
    });

    this.jobs.set(name, job);
    job.start();

    logger.info(`Scheduled job '${name}' with schedule '${schedule}'`);
  }

  static stopJob(name: string): void {
    const job = this.jobs.get(name);
    if (job) {
      job.stop();
      this.jobs.delete(name);
      logger.info(`Stopped job '${name}'`);
    }
  }

  static stopAllJobs(): void {
    this.jobs.forEach((job, name) => {
      job.stop();
      logger.info(`Stopped job '${name}'`);
    });
    this.jobs.clear();
  }
}
