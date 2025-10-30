import 'dotenv/config';
import { githubClient } from '../services/github/githubClient.js';
async function test() {
    console.log('Testing GitHub client...\n');
    const user = await githubClient.FetchUserRepo();
    console.log('User:', user);
    // Test activity stats
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const stats = await githubClient.fetchActivityStat(yesterday.toISOString());
    console.log('Activity stats:', stats);
    console.log('\n✅ GitHub integration working!');
}
test().catch(console.error);
//# sourceMappingURL=testGithub.js.map