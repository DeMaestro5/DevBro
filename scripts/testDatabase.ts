import { initializeDatabase } from '../config/database';
import { ActivityModel } from '../models/Activity';
import { ProjectModel } from '../models/Project';
import { logger } from '../utils/logger';

async function testDatabase(): Promise<void> {
  try {
    logger.info('Testing database connection...');
    
    // Initialize database
    await initializeDatabase();
    
    // Test creating an activity
    const testActivity = ActivityModel.create({
      date: '2024-01-01',
      commits: 5,
      pull_requests: 2,
      issues: 1,
      total_additions: 100,
      total_deletions: 50
    });
    
    logger.info('Created test activity:', testActivity);
    
    // Test creating a project
    const testProject = ProjectModel.create({
      name: 'test-project',
      repo_url: 'https://github.com/user/test-project',
      language: 'TypeScript',
      last_commit_date: '2024-01-01T12:00:00Z',
      is_stale: 0
    });
    
    logger.info('Created test project:', testProject);
    
    logger.info('Database test completed successfully!');
  } catch (error) {
    logger.error('Database test failed:', error);
    process.exit(1);
  }
}

testDatabase();
