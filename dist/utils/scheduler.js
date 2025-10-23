"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const logger_1 = require("./logger");
const constants_1 = require("../config/constants");
class Scheduler {
    static startScheduler() {
        logger_1.logger.info('Starting DevBro scheduler...');
        // Daily check at 9 AM
        this.scheduleJob('dailyCheck', constants_1.CRON_SCHEDULES.DAILY_CHECK, () => {
            logger_1.logger.info('Running daily check...');
            // TODO: Import and run daily check job
        });
        // Weekly report on Monday at 8 AM
        this.scheduleJob('weeklyReport', constants_1.CRON_SCHEDULES.WEEKLY_REPORT, () => {
            logger_1.logger.info('Running weekly report...');
            // TODO: Import and run weekly report job
        });
        // Trend updates every 6 hours
        this.scheduleJob('trendUpdate', constants_1.CRON_SCHEDULES.TREND_UPDATE, () => {
            logger_1.logger.info('Updating trends...');
            // TODO: Import and run trend update job
        });
        // Project reminders at 5 PM
        this.scheduleJob('projectReminder', constants_1.CRON_SCHEDULES.PROJECT_REMINDER, () => {
            logger_1.logger.info('Sending project reminders...');
            // TODO: Import and run project reminder job
        });
        logger_1.logger.info('DevBro scheduler started successfully');
    }
    static scheduleJob(name, schedule, task) {
        const job = node_cron_1.default.schedule(schedule, task);
        this.jobs.set(name, job);
        job.start();
        logger_1.logger.info(`Scheduled job '${name}' with schedule '${schedule}'`);
    }
    static stopJob(name) {
        const job = this.jobs.get(name);
        if (job) {
            job.stop();
            this.jobs.delete(name);
            logger_1.logger.info(`Stopped job '${name}'`);
        }
    }
    static stopAllJobs() {
        this.jobs.forEach((job, name) => {
            job.stop();
            logger_1.logger.info(`Stopped job '${name}'`);
        });
        this.jobs.clear();
    }
}
exports.Scheduler = Scheduler;
Scheduler.jobs = new Map();
//# sourceMappingURL=scheduler.js.map