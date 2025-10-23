"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModel = void 0;
const database_1 = require("../config/database");
const logger_1 = require("../utils/logger");
class ActivityModel {
    static create(activity) {
        const newActivity = database_1.JsonDatabase.insert('activities', activity);
        logger_1.logger.info(`Created activity for ${activity.date}`);
        return newActivity;
    }
    static findById(id) {
        return database_1.JsonDatabase.findById('activities', id);
    }
    static findByDate(date) {
        return database_1.JsonDatabase.findByField('activities', 'date', date);
    }
    static findAll(limit = 30) {
        const activities = database_1.JsonDatabase.get('activities');
        return activities
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit);
    }
    static update(id, updates) {
        const updated = database_1.JsonDatabase.update('activities', id, updates);
        if (updated) {
            logger_1.logger.info(`Updated activity ${id}`);
        }
        return updated;
    }
    static delete(id) {
        const deleted = database_1.JsonDatabase.delete('activities', id);
        if (deleted) {
            logger_1.logger.info(`Deleted activity ${id}`);
        }
        return deleted;
    }
}
exports.ActivityModel = ActivityModel;
//# sourceMappingURL=Activity.js.map