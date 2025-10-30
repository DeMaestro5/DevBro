import { JsonDatabase } from '../config/database.js';
import { logger } from '../utils/logger.js';
export class ActivityModel {
    static create(activity) {
        const newActivity = JsonDatabase.insert('activities', activity);
        logger.info(`Created activity for ${activity.date}`);
        return newActivity;
    }
    static findById(id) {
        return JsonDatabase.findById('activities', id);
    }
    static findByDate(date) {
        return JsonDatabase.findByField('activities', 'date', date);
    }
    static findAll(limit = 30) {
        const activities = JsonDatabase.get('activities');
        return activities
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit);
    }
    static update(id, updates) {
        const updated = JsonDatabase.update('activities', id, updates);
        if (updated) {
            logger.info(`Updated activity ${id}`);
        }
        return updated;
    }
    static delete(id) {
        const deleted = JsonDatabase.delete('activities', id);
        if (deleted) {
            logger.info(`Deleted activity ${id}`);
        }
        return deleted;
    }
}
//# sourceMappingURL=Activity.js.map