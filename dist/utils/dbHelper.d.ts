export declare class DbHelper {
    static getStats(): Promise<any>;
    static executeQuery<T>(table: string, filter?: (item: any) => boolean): Promise<T[]>;
}
//# sourceMappingURL=dbHelper.d.ts.map