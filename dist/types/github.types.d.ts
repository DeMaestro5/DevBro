export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
}
export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    language: string | null | undefined;
    stargazers_count: number | undefined;
    forks_count: number | undefined;
    updated_at: string | null | undefined;
    pushed_at: string | null | undefined;
}
export interface GitHubCommit {
    sha: string;
    commit: {
        message: string;
        author: {
            name: string | undefined;
            email: string | undefined;
            date: string | undefined;
        };
    };
    html_url: string;
}
export interface GitHubActivity {
    date: string;
    commits: number;
    pull_requests: number;
    issues: number;
    additions: number;
    deletions: number;
}
//# sourceMappingURL=github.types.d.ts.map