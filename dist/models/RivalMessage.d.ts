export interface RivalMessage {
    id?: number;
    message: string;
    message_type?: string;
    tone?: string;
    activity_id?: number;
    created_at?: string;
}
export declare class RivalMessageModel {
    static create(message: Omit<RivalMessage, 'id' | 'created_at'>): RivalMessage;
    static findById(id: number): RivalMessage | null;
    static findAll(limit?: number): RivalMessage[];
    static findByType(messageType: string): RivalMessage[];
    static delete(id: number): boolean;
}
//# sourceMappingURL=RivalMessage.d.ts.map