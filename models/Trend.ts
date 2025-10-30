import { JsonDatabase } from '../config/database.js';
import { logger } from '../utils/logger.js';

export interface Trend {
  id?: number;
  source: string;
  title: string;
  url: string;
  score: number;
  created_at?: string;
}

export class TrendModel {
  static create(trend: Omit<Trend, 'id' | 'created_at'>): Trend {
    const newTrend = JsonDatabase.insert('trends', trend);
    logger.info(`Created trend: ${trend.title}`);
    return newTrend;
  }

  static findById(id: number): Trend | null {
    return JsonDatabase.findById('trends', id);
  }

  static findAll(limit: number = 50): Trend[] {
    const trends = JsonDatabase.get('trends');
    return trends
      .sort(
        (a: Trend, b: Trend) =>
          new Date(b.created_at || '').getTime() -
          new Date(a.created_at || '').getTime(),
      )
      .slice(0, limit);
  }

  static findBySource(source: string, limit: number = 20): Trend[] {
    const trends = JsonDatabase.findAllByField('trends', 'source', source);
    return trends
      .sort(
        (a: Trend, b: Trend) =>
          new Date(b.created_at || '').getTime() -
          new Date(a.created_at || '').getTime(),
      )
      .slice(0, limit);
  }

  static delete(id: number): boolean {
    const deleted = JsonDatabase.delete('trends', id);
    if (deleted) {
      logger.info(`Deleted trend ${id}`);
    }
    return deleted;
  }
}
