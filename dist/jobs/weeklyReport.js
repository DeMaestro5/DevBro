import { ActivityModel } from '../models/Activity.js';
import { ProjectModel } from '../models/Project.js';
import { ChallengeModel } from '../models/Challenge.js';
import { NotificationService } from '../services/notifications/notificationService.js';
import { logger } from '../utils/logger.js';
// import { DateHelper } from '../utils/dateHelper';
export class WeeklyReportJob {
    constructor() {
        this.notificationService = new NotificationService();
    }
    async execute() {
        try {
            logger.info('Executing weekly report job...');
            // const weekAgo = DateHelper.getWeekAgo();
            const activities = ActivityModel.findAll(7);
            // Calculate weekly stats
            const totalCommits = activities.reduce((sum, activity) => sum + activity.commits, 0);
            const totalPRs = activities.reduce((sum, activity) => sum + activity.pull_requests, 0);
            const totalIssues = activities.reduce((sum, activity) => sum + activity.issues, 0);
            // Get project stats
            const totalProjects = ProjectModel.findAll().length;
            const staleProjects = ProjectModel.findStale().length;
            // Get challenge stats
            const activeChallenges = ChallengeModel.findActive().length;
            const completedChallenges = ChallengeModel.findCompleted().length;
            // Generate report content
            const reportContent = `
📊 **Weekly DevBro Report**

**Activity Summary:**
• Commits: ${totalCommits}
• Pull Requests: ${totalPRs}
• Issues: ${totalIssues}

**Project Status:**
• Total Projects: ${totalProjects}
• Stale Projects: ${staleProjects}

**Challenges:**
• Active: ${activeChallenges}
• Completed: ${completedChallenges}

Keep up the great work! 🚀
      `.trim();
            // Send weekly report
            await this.notificationService.sendNotification({
                title: '📊 Weekly DevBro Report',
                content: reportContent,
                type: 'achievement',
                priority: 'low',
            });
            logger.info('Weekly report job completed successfully');
        }
        catch (error) {
            logger.error('Error in weekly report job:', error);
            throw error;
        }
    }
}
//# sourceMappingURL=weeklyReport.js.map