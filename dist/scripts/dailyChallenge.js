import 'dotenv/config';
import { DailyChallengeJob } from '../jobs/dailyChallenge.js';
import Logger from '../helpers/Logger.js';
async function testDailyChallenge() {
    try {
        Logger.info('Testing Daily Challenge');
        const dailyChallenge = new DailyChallengeJob();
        await dailyChallenge.execute();
    }
    catch (error) {
        Logger.warn('Something went wrong');
    }
}
testDailyChallenge();
//# sourceMappingURL=dailyChallenge.js.map