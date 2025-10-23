import { Activity } from '../../models/Activity';
export declare class ActivityMonitor {
    private githubClient;
    monitorDailyActivity(): Promise<Activity>;
    updateProjectStatus(): Promise<void>;
    syncRepositories(): Promise<void>;
}
//# sourceMappingURL=activityMonitor.d.ts.map