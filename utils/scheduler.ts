import cron, { ScheduledTask } from 'node-cron';
import { logger } from './logger.js';
import { CRON_SCHEDULES } from '../config/constants.js';
import { DailyCheckJob } from '../jobs/dailyCheck.js';
import Logger from '../helpers/Logger.js';
import { WeeklyReportJob } from '../jobs/weeklyReport.js';
import { ProjectReminderJob } from '../jobs/projectReminder.js';

export class Scheduler {
  private static jobs: Map<string, ScheduledTask> = new Map();

  static startScheduler(): void {
    logger.info('Starting DevBro scheduler...');

    // Daily check at 9 AM
    this.scheduleJob(
      'dailyCheck',
      CRON_SCHEDULES.DAILY_CHECK,
      async () => {
        logger.info('Running daily check...');
        try {
          await new DailyCheckJob().execute();
          Logger.info('Daily Check Finished');
        } catch (error) {
          Logger.error('Daily Check Failed', error);
        }
      },
      { timezone: 'Africa/Lagos' },
    );

    // Weekly report on Monday at 8 AM
    this.scheduleJob(
      'weeklyReport',
      CRON_SCHEDULES.WEEKLY_REPORT,
      async () => {
        logger.info('Running weekly report...');
        try {
          await new WeeklyReportJob().execute();
          Logger.info('Weekly Check finished');
        } catch (error) {
          Logger.error('Weekly Check Failed', error);
        }
      },
      { timezone: 'Africa/Lagos' },
    );

    // // Trend updates every 6 hours
    // this.scheduleJob('trendUpdate', CRON_SCHEDULES.TREND_UPDATE, () => {
    //   logger.info('Updating trends...');
    //   // TODO: Import and run trend update job
    // });

    // Project reminders at 5 PM
    this.scheduleJob(
      'projectReminder',
      CRON_SCHEDULES.PROJECT_REMINDER,
      async () => {
        logger.info('Sending project reminders...');
        try {
          await new ProjectReminderJob().execute();
          Logger.info('Project Reminder Finished');
        } catch (error) {
          Logger.error('Project Reminder Failed', error);
        }
      },
      { timezone: 'Africa/Lagos' },
    );

    logger.info('DevBro scheduler started successfully');
  }

  private static scheduleJob(
    name: string,
    schedule: string,
    task: () => void,
    options?: { timezone?: string },
  ): void {
    const job = cron.schedule(schedule, task, options);
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
