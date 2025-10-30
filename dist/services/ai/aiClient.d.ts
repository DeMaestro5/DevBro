import { AIResponse } from '../../types/ai.types.js';
export declare class AIClient {
    private genAI;
    private model;
    constructor();
    generateMessage(activity: any, tone?: string): Promise<AIResponse>;
    generateChallenge(activity: any): Promise<any>;
    private buildSystemPrompt;
    private buildUserPrompt;
}
//# sourceMappingURL=aiClient.d.ts.map