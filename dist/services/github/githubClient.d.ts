import { GitHubCommit, GitHubRepo, GitHubUser } from '../../types/github.types';
import { Activity } from '../../models/Activity';
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