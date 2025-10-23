"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevBroApp = void 0;
const database_1 = require("./config/database");
const scheduler_1 = require("./utils/scheduler");
const logger_1 = require("./utils/logger");
class DevBroApp {
    async start() {
        try {
            logger_1.logger.info('🚀 Starting DevBro...');
            // Initialize database
            await (0, database_1.initializeDatabase)();
            // Start scheduler
            scheduler_1.Scheduler.startScheduler();
            logger_1.logger.info('✅ DevBro started successfully!');
            logger_1.logger.info('📅 Scheduler is running...');
            logger_1.logger.info('💾 Database is ready...');
        }
        catch (error) {
            logger_1.logger.error('❌ Failed to start DevBro:', error);
            throw error;
        }
    }
    async stop() {
        try {
            logger_1.logger.info('🛑 Stopping DevBro...');
            // Stop all scheduled jobs
            scheduler_1.Scheduler.stopAllJobs();
            logger_1.logger.info('✅ DevBro stopped successfully!');
        }
        catch (error) {
            logger_1.logger.error('❌ Error stopping DevBro:', error);
            throw error;
        }
    }
}
exports.DevBroApp = DevBroApp;
//# sourceMappingURL=app.js.map