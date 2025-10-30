import { JsonDatabase } from '../config/database.js';
import { logger } from '../utils/logger.js';

export interface Activity {
  id?: number;
  date: string;
  commits: number;
  pull_requests: number;
  issues: number;
  total_additions: number;
  total_deletions: number;
  created_at?: string;
}

export class ActivityModel {
  static create(activity: Omit<Activity, 'id' | 'created_at'>): Activity {
    const newActivity = JsonDatabase.insert('activities', activity);
    logger.info(`Created activity for ${activity.date}`);
    return newActivity;
  }

  static findById(id: number): Activity | null {
    return JsonDatabase.findById('activities', id);
  }

  static findByDate(date: string): Activity | null {
    return JsonDatabase.findByField('activities', 'date', date);
  }

  static findAll(limit: number = 30): Activity[] {
    const activities = JsonDatabase.get('activities');
    return activities
      .sort(
        (a: Activity, b: Activity) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
      .slice(0, limit);
  }

  static update(id: number, updates: Partial<Activity>): Activity | null {
    const updated = JsonDatabase.update('activities', id, updates);
    if (updated) {
      logger.info(`Updated activity ${id}`);
    }
    return updated;
  }

  static delete(id: number): boolean {
    const deleted = JsonDatabase.delete('activities', id);
    if (deleted) {
      logger.info(`Deleted activity ${id}`);
    }
    return deleted;
  }
}
