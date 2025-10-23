export declare class JsonDatabase {
    private static readData;
    private static writeData;
    static get(table: string): any[];
    static insert(table: string, record: any): any;
    static update(table: string, id: number, updates: any): any | null;
    static delete(table: string, id: number): boolean;
    static findById(table: string, id: number): any | null;
    static findByField(table: string, field: string, value: any): any | null;
    static findAllByField(table: string, field: string, value: any): any[];
}
export declare function initializeDatabase(): Promise<void>;
//# sourceMappingURL=database.d.ts.map