export interface Activity {
    id?: number;
    date: string;
    commits: number;
    pull_requests: number;
    issues: number;
    total_additions: number;
    total_deletions: number;
    created_at?: string;
}
export declare class ActivityModel {
    static create(activity: Omit<Activity, 'id' | 'created_at'>): Activity;
    static findById(id: number): Activity | null;
    static findByDate(date: string): Activity | null;
    static findAll(limit?: number): Activity[];
    static update(id: number, updates: Partial<Activity>): Activity | null;
    static delete(id: number): boolean;
}
//# sourceMappingURL=Activity.d.ts.map