import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger';

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
  private static readData(): any {
    const data = fs.readFileSync(dbFile, 'utf8');
    return JSON.parse(data);
  }

  private static writeData(data: any): void {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
  }

  static get(table: string): any[] {
    const data = this.readData();
    return data[table] || [];
  }

  static insert(table: string, record: any): any {
    const data = this.readData();
    const id = Date.now() + Math.random(); // Simple ID generation
    const newRecord = { id, ...record, created_at: new Date().toISOString() };
    data[table].push(newRecord);
    this.writeData(data);
    return newRecord;
  }

  static update(table: string, id: number, updates: any): any | null {
    const data = this.readData();
    const index = data[table].findIndex((item: any) => item.id === id);
    if (index !== -1) {
      data[table][index] = { ...data[table][index], ...updates };
      this.writeData(data);
      return data[table][index];
    }
    return null;
  }

  static delete(table: string, id: number): boolean {
    const data = this.readData();
    const index = data[table].findIndex((item: any) => item.id === id);
    if (index !== -1) {
      data[table].splice(index, 1);
      this.writeData(data);
      return true;
    }
    return false;
  }

  static findById(table: string, id: number): any | null {
    const data = this.readData();
    return data[table].find((item: any) => item.id === id) || null;
  }

  static findByField(table: string, field: string, value: any): any | null {
    const data = this.readData();
    return data[table].find((item: any) => item[field] === value) || null;
  }

  static findAllByField(table: string, field: string, value: any): any[] {
    const data = this.readData();
    return data[table].filter((item: any) => item[field] === value);
  }
}

export async function initializeDatabase(): Promise<void> {
  try {
    logger.info('Initializing DevBro database...');

    // Database is already initialized with JSON file
    logger.info('DevBro database initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    throw error;
  }
}
