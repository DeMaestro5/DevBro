export interface Project {
    id?: number;
    name: string;
    repo_url?: string;
    language?: string | null;
    last_commit_date?: string | null;
    is_stale: number;
    created_at?: string;
    updated_at?: string;
}
export declare class ProjectModel {
    static create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Project;
    static findById(id: number): Project | null;
    static findByName(name: string): Project | null;
    static findAll(): Project[];
    static findStale(): Project[];
    static update(id: number, updates: Partial<Project>): Project | null;
    static delete(id: number): boolean;
}
//# sourceMappingURL=Project.d.ts.map