export interface Config {
    github: {
        token: string;
        username: string;
    };
    ai: {
        apiKey: string;
    };
    email: {
        user: string;
        pass: string;
        to: string;
    };
    discord: {
        webhookUrl: string;
    };
}
export declare const logDirectory: string | undefined;
export declare const environment: string | undefined;
export declare const config: Config;
//# sourceMappingURL=env.d.ts.map