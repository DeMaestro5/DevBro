import 'dotenv/config';
import { AIClient } from '../services/ai/aiClient.js';

async function testAi() {
  console.log('🤖 Testing AI Client...\n');

  const aiClient = new AIClient();

  // Test 1: Good activity with encouraging tone
  console.log('Test 1: Encouraging message for good activity');
  const goodActivity = {
    commits: 12,
    pull_requests: 3,
    issues: 2,
  };
  const encouragingMsg = await aiClient.generateMessage(
    goodActivity,
    'encouraging',
  );
  console.log('Response', encouragingMsg);
  console.log('');
  // Test 2: Low activity with challenging tone
  console.log('Test 2: Challenging message for low activity');
  const lowActivity = {
    commits: 2,
    pull_requests: 0,
    issues: 0,
  };
  const challengingMsg = await aiClient.generateMessage(
    lowActivity,
    'challenging',
  );
  console.log('Response:', challengingMsg.message);
  console.log('');
  // Test 3: Zero activity with teasing tone
  console.log('Test 3: Teasing message for no activity');
  const noActivity = {
    commits: 0,
    pull_requests: 0,
    issues: 0,
  };
  const teasingMsg = await aiClient.generateMessage(noActivity, 'teasing');
  console.log('Response:', teasingMsg.message);
  console.log('');
  //Test 4: Generate challenge
  console.log('Test 4: Generate coding challenge');
  const activity = {
    commits: 5,
    pull_requests: 2,
    issues: 2,
  };
  const challenge = await aiClient.generateChallenge(activity);
  console.log('Generate Coding Challenge:', challenge);

  console.log('✅ AI Client tests complete!');
}
testAi().catch(console.error);
