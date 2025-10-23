"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeModel = void 0;
const database_1 = require("../config/database");
const logger_1 = require("../utils/logger");
class ChallengeModel {
    static create(challenge) {
        const newChallenge = database_1.JsonDatabase.insert('challenges', challenge);
        logger_1.logger.info(`Created challenge: ${challenge.title}`);
        return newChallenge;
    }
    static findById(id) {
        return database_1.JsonDatabase.findById('challenges', id);
    }
    static findAll() {
        const challenges = database_1.JsonDatabase.get('challenges');
        return challenges.sort((a, b) => new Date(b.created_at || '').getTime() -
            new Date(a.created_at || '').getTime());
    }
    static findActive() {
        return database_1.JsonDatabase.findAllByField('challenges', 'is_completed', 0);
    }
    static findCompleted() {
        return database_1.JsonDatabase.findAllByField('challenges', 'is_completed', 1);
    }
    static complete(id) {
        const updated = database_1.JsonDatabase.update('challenges', id, {
            is_completed: 1,
            completed_at: new Date().toISOString(),
        });
        if (updated) {
            logger_1.logger.info(`Completed challenge ${id}: ${updated.title}`);
        }
        return updated;
    }
    static delete(id) {
        const deleted = database_1.JsonDatabase.delete('challenges', id);
        if (deleted) {
            logger_1.logger.info(`Deleted challenge ${id}`);
        }
        return deleted;
    }
}
exports.ChallengeModel = ChallengeModel;
//# sourceMappingURL=Challenge.js.map