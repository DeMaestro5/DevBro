import 'dotenv/config';
import { DailyCheckJob } from '../jobs/dailyCheck.js';
import { logger } from '../utils/logger.js';
async function testDailyCheck() {
    try {
        logger.info('Testing daily check job...');
        const dailyCheckJob = new DailyCheckJob();
        await dailyCheckJob.execute();
        logger.info('Daily check test completed successfully!');
    }
    catch (error) {
        logger.error('Daily check test failed:', error);
        process.exit(1);
    }
}
testDailyCheck();
//# sourceMappingURL=testDailyCheck.js.map