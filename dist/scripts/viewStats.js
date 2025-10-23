"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbHelper_1 = require("../utils/dbHelper");
const logger_1 = require("../utils/logger");
async function viewStats() {
    try {
        logger_1.logger.info('Fetching DevBro statistics...');
        const stats = await dbHelper_1.DbHelper.getStats();
        console.log('\n📊 DevBro Statistics');
        console.log('==================');
        console.log(`Total Activities: ${stats.totalActivities}`);
        console.log(`Total Projects: ${stats.totalProjects}`);
        console.log(`Total Messages: ${stats.totalMessages}`);
        console.log(`Total Challenges: ${stats.totalChallenges}`);
        console.log(`Total Trends: ${stats.totalTrends}`);
        console.log(`Active Challenges: ${stats.activeChallenges}`);
        console.log(`Stale Projects: ${stats.staleProjects}`);
        logger_1.logger.info('Stats displayed successfully');
    }
    catch (error) {
        logger_1.logger.error('Error viewing stats:', error);
        process.exit(1);
    }
}
viewStats();
//# sourceMappingURL=viewStats.js.map