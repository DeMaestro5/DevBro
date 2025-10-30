import { JsonDatabase } from '../config/database.js';
import { logger } from '../utils/logger.js';

export interface Challenge {
  id?: number;
  title: string;
  description?: string;
  difficulty?: string;
  is_completed: number;
  created_at?: string;
  completed_at?: string;
}

export class ChallengeModel {
  static create(challenge: Omit<Challenge, 'id' | 'created_at'>): Challenge {
    const newChallenge = JsonDatabase.insert('challenges', challenge);
    logger.info(`Created challenge: ${challenge.title}`);
    return newChallenge;
  }

  static findById(id: number): Challenge | null {
    return JsonDatabase.findById('challenges', id);
  }

  static findAll(): Challenge[] {
    const challenges = JsonDatabase.get('challenges');
    return challenges.sort(
      (a: Challenge, b: Challenge) =>
        new Date(b.created_at || '').getTime() -
        new Date(a.created_at || '').getTime(),
    );
  }

  static findActive(): Challenge[] {
    return JsonDatabase.findAllByField('challenges', 'is_completed', 0);
  }

  static findCompleted(): Challenge[] {
    return JsonDatabase.findAllByField('challenges', 'is_completed', 1);
  }

  static complete(id: number): Challenge | null {
    const updated = JsonDatabase.update('challenges', id, {
      is_completed: 1,
      completed_at: new Date().toISOString(),
    });
    if (updated) {
      logger.info(`Completed challenge ${id}: ${updated.title}`);
    }
    return updated;
  }

  static delete(id: number): boolean {
    const deleted = JsonDatabase.delete('challenges', id);
    if (deleted) {
      logger.info(`Deleted challenge ${id}`);
    }
    return deleted;
  }
}
