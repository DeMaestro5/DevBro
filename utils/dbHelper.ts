import { JsonDatabase } from '../config/database';
import { logger } from './logger';

export class DbHelper {
  static async getStats(): Promise<any> {
    try {
      const stats = {
        totalActivities: JsonDatabase.get('activities').length,
        totalProjects: JsonDatabase.get('projects').length,
        totalMessages: JsonDatabase.get('rival_messages').length,
        totalChallenges: JsonDatabase.get('challenges').length,
        totalTrends: JsonDatabase.get('trends').length,
        activeChallenges: JsonDatabase.get('challenges').filter(
          (c: any) => !c.is_completed,
        ).length,
        staleProjects: JsonDatabase.get('projects').filter(
          (p: any) => p.is_stale,
        ).length,
      };

      return stats;
    } catch (error) {
      logger.error('Error getting database stats:', error);
      throw error;
    }
  }

  static async executeQuery<T>(
    table: string,
    filter?: (item: any) => boolean,
  ): Promise<T[]> {
    try {
      const data = JsonDatabase.get(table);
      if (filter) {
        return data.filter(filter) as T[];
      }
      return data as T[];
    } catch (error) {
      logger.error('Database query error:', error);
      throw error;
    }
  }
}
