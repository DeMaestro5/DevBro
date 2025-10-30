import { DbHelper } from '../utils/dbHelper';
import { logger } from '../utils/logger';
async function viewStats() {
    try {
        logger.info('Fetching DevBro statistics...');
        const stats = await DbHelper.getStats();
        console.log('\n📊 DevBro Statistics');
        console.log('==================');
        console.log(`Total Activities: ${stats.totalActivities}`);
        console.log(`Total Projects: ${stats.totalProjects}`);
        console.log(`Total Messages: ${stats.totalMessages}`);
        console.log(`Total Challenges: ${stats.totalChallenges}`);
        console.log(`Total Trends: ${stats.totalTrends}`);
        console.log(`Active Challenges: ${stats.activeChallenges}`);
        console.log(`Stale Projects: ${stats.staleProjects}`);
        logger.info('Stats displayed successfully');
    }
    catch (error) {
        logger.error('Error viewing stats:', error);
        process.exit(1);
    }
}
viewStats();
//# sourceMappingURL=viewStats.js.map