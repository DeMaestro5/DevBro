import { JsonDatabase } from '../config/database.js';
import { logger } from '../utils/logger.js';
export class ChallengeModel {
    static create(challenge) {
        const newChallenge = JsonDatabase.insert('challenges', challenge);
        logger.info(`Created challenge: ${challenge.title}`);
        return newChallenge;
    }
    static findById(id) {
        return JsonDatabase.findById('challenges', id);
    }
    static findAll() {
        const challenges = JsonDatabase.get('challenges');
        return challenges.sort((a, b) => new Date(b.created_at || '').getTime() -
            new Date(a.created_at || '').getTime());
    }
    static findActive() {
        return JsonDatabase.findAllByField('challenges', 'is_completed', 0);
    }
    static findCompleted() {
        return JsonDatabase.findAllByField('challenges', 'is_completed', 1);
    }
    static complete(id) {
        const updated = JsonDatabase.update('challenges', id, {
            is_completed: 1,
            completed_at: new Date().toISOString(),
        });
        if (updated) {
            logger.info(`Completed challenge ${id}: ${updated.title}`);
        }
        return updated;
    }
    static delete(id) {
        const deleted = JsonDatabase.delete('challenges', id);
        if (deleted) {
            logger.info(`Deleted challenge ${id}`);
        }
        return deleted;
    }
}
//# sourceMappingURL=Challenge.js.map