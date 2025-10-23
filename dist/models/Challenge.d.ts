export interface Challenge {
    id?: number;
    title: string;
    description?: string;
    difficulty?: string;
    is_completed: number;
    created_at?: string;
    completed_at?: string;
}
export declare class ChallengeModel {
    static create(challenge: Omit<Challenge, 'id' | 'created_at'>): Challenge;
    static findById(id: number): Challenge | null;
    static findAll(): Challenge[];
    static findActive(): Challenge[];
    static findCompleted(): Challenge[];
    static complete(id: number): Challenge | null;
    static delete(id: number): boolean;
}
//# sourceMappingURL=Challenge.d.ts.map