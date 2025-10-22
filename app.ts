import { initializeDatabase } from './config/database';
import { Scheduler } from './utils/scheduler';
import { logger } from './utils/logger';

export class DevBroApp {
  async start(): Promise<void> {
    try {
      logger.info('🚀 Starting DevBro...');

      // Initialize database
      await initializeDatabase();

      // Start scheduler
      Scheduler.startScheduler();

      logger.info('✅ DevBro started successfully!');
      logger.info('📅 Scheduler is running...');
      logger.info('💾 Database is ready...');
    } catch (error) {
      logger.error('❌ Failed to start DevBro:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      logger.info('🛑 Stopping DevBro...');

      // Stop all scheduled jobs
      Scheduler.stopAllJobs();

      logger.info('✅ DevBro stopped successfully!');
    } catch (error) {
      logger.error('❌ Error stopping DevBro:', error);
      throw error;
    }
  }
}
