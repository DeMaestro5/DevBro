import 'dotenv/config';
import { githubClient } from '../services/github/githubClient.js';

async function test() {
  console.log('Testing GitHub client...\n');

  // Check environment variables
  console.log('Environment check:');
  console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN ? 'Set' : 'Not set');
  console.log('GITHUB_USERNAME:', process.env.GITHUB_USERNAME || 'Not set');
  console.log('');

  // Test user info
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
