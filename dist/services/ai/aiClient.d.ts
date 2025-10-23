import { AIResponse } from '../../types/ai.types';
export declare class AIClient {
    private apiKey;
    constructor();
    generateMessage(context: string, tone?: string): Promise<AIResponse>;
    generateChallenge(activity: any): Promise<any>;
}
//# sourceMappingURL=aiClient.d.ts.map