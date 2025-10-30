import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';
// Create data directory if it doesn't exist
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
// JSON Database implementation
const dbFile = path.join(dataDir, 'devbro.json');
// Initialize database file if it doesn't exist
if (!fs.existsSync(dbFile)) {
    const initialData = {
        activities: [],
        projects: [],
        rival_messages: [],
        challenges: [],
        trends: [],
    };
    fs.writeFileSync(dbFile, JSON.stringify(initialData, null, 2));
}
export class JsonDatabase {
    static readData() {
        const data = fs.readFileSync(dbFile, 'utf8');
        return JSON.parse(data);
    }
    static writeData(data) {
        fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
    }
    static get(table) {
        const data = this.readData();
        return data[table] || [];
    }
    static insert(table, record) {
        const data = this.readData();
        const id = Date.now() + Math.random(); // Simple ID generation
        const newRecord = { id, ...record, created_at: new Date().toISOString() };
        data[table].push(newRecord);
        this.writeData(data);
        return newRecord;
    }
    static update(table, id, updates) {
        const data = this.readData();
        const index = data[table].findIndex((item) => item.id === id);
        if (index !== -1) {
            data[table][index] = { ...data[table][index], ...updates };
            this.writeData(data);
            return data[table][index];
        }
        return null;
    }
    static delete(table, id) {
        const data = this.readData();
        const index = data[table].findIndex((item) => item.id === id);
        if (index !== -1) {
            data[table].splice(index, 1);
            this.writeData(data);
            return true;
        }
        return false;
    }
    static findById(table, id) {
        const data = this.readData();
        return data[table].find((item) => item.id === id) || null;
    }
    static findByField(table, field, value) {
        const data = this.readData();
        return data[table].find((item) => item[field] === value) || null;
    }
    static findAllByField(table, field, value) {
        const data = this.readData();
        return data[table].filter((item) => item[field] === value);
    }
}
export async function initializeDatabase() {
    try {
        logger.info('Initializing DevBro database...');
        // Database is already initialized with JSON file
        logger.info('DevBro database initialized successfully');
    }
    catch (error) {
        logger.error('Failed to initialize database:', error);
        throw error;
    }
}
//# sourceMappingURL=database.js.map