export interface Trend {
    id?: number;
    source: string;
    title: string;
    url: string;
    score: number;
    created_at?: string;
}
export declare class TrendModel {
    static create(trend: Omit<Trend, 'id' | 'created_at'>): Trend;
    static findById(id: number): Trend | null;
    static findAll(limit?: number): Trend[];
    static findBySource(source: string, limit?: number): Trend[];
    static delete(id: number): boolean;
}
//# sourceMappingURL=Trend.d.ts.map