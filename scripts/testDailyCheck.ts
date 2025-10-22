import { DailyCheckJob } from '../jobs/dailyCheck';
import { logger } from '../utils/logger';

async function testDailyCheck(): Promise<void> {
  try {
    logger.info('Testing daily check job...');
    
    const dailyCheckJob = new DailyCheckJob();
    await dailyCheckJob.execute();
    
    logger.info('Daily check test completed successfully!');
  } catch (error) {
    logger.error('Daily check test failed:', error);
    process.exit(1);
  }
}

testDailyCheck();
