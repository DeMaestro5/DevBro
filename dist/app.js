import { initializeDatabase } from './config/database.js';
import { Scheduler } from './utils/scheduler.js';
import { logger } from './utils/logger.js';
export class DevBroApp {
    async start() {
        try {
            logger.info('🚀 Starting DevBro...');
            // Initialize database
            await initializeDatabase();
            // Start scheduler
            Scheduler.startScheduler();
            logger.info('✅ DevBro started successfully!');
            logger.info('📅 Scheduler is running...');
            logger.info('💾 Database is ready...');
        }
        catch (error) {
            logger.error('❌ Failed to start DevBro:', error);
            throw error;
        }
    }
    async stop() {
        try {
            logger.info('🛑 Stopping DevBro...');
            // Stop all scheduled jobs
            Scheduler.stopAllJobs();
            logger.info('✅ DevBro stopped successfully!');
        }
        catch (error) {
            logger.error('❌ Error stopping DevBro:', error);
            throw error;
        }
    }
}
//# sourceMappingURL=app.js.map