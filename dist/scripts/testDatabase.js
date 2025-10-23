"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const Activity_1 = require("../models/Activity");
const Project_1 = require("../models/Project");
const logger_1 = require("../utils/logger");
async function testDatabase() {
    try {
        logger_1.logger.info('Testing database connection...');
        // Initialize database
        await (0, database_1.initializeDatabase)();
        // Test creating an activity
        const testActivity = Activity_1.ActivityModel.create({
            date: '2024-01-01',
            commits: 5,
            pull_requests: 2,
            issues: 1,
            total_additions: 100,
            total_deletions: 50
        });
        logger_1.logger.info('Created test activity:', testActivity);
        // Test creating a project
        const testProject = Project_1.ProjectModel.create({
            name: 'test-project',
            repo_url: 'https://github.com/user/test-project',
            language: 'TypeScript',
            last_commit_date: '2024-01-01T12:00:00Z',
            is_stale: 0
        });
        logger_1.logger.info('Created test project:', testProject);
        logger_1.logger.info('Database test completed successfully!');
    }
    catch (error) {
        logger_1.logger.error('Database test failed:', error);
        process.exit(1);
    }
}
testDatabase();
//# sourceMappingURL=testDatabase.js.map