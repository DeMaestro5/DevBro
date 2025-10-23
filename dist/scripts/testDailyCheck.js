"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dailyCheck_1 = require("../jobs/dailyCheck");
const logger_1 = require("../utils/logger");
async function testDailyCheck() {
    try {
        logger_1.logger.info('Testing daily check job...');
        const dailyCheckJob = new dailyCheck_1.DailyCheckJob();
        await dailyCheckJob.execute();
        logger_1.logger.info('Daily check test completed successfully!');
    }
    catch (error) {
        logger_1.logger.error('Daily check test failed:', error);
        process.exit(1);
    }
}
testDailyCheck();
//# sourceMappingURL=testDailyCheck.js.map