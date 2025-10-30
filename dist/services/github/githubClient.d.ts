import { GitHubCommit, GitHubRepo, GitHubUser } from '../../types/github.types.js';
import { Activity } from '../../models/Activity.js';
declare class GithubClient {
    private octokit;
    constructor();
    healthCheck(): Promise<boolean>;
    fetchProfile(): Promise<GitHubUser>;
    FetchUserRepo(): Promise<GitHubRepo[]>;
    FetchRepoCommits(name: string): Promise<GitHubCommit[]>;
    fetchActivityStat(since: string): Promise<Activity>;
}
export declare const githubClient: GithubClient;
export {};
//# sourceMappingURL=githubClient.d.ts.map