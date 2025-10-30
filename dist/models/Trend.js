import { JsonDatabase } from '../config/database.js';
import { logger } from '../utils/logger.js';
export class TrendModel {
    static create(trend) {
        const newTrend = JsonDatabase.insert('trends', trend);
        logger.info(`Created trend: ${trend.title}`);
        return newTrend;
    }
    static findById(id) {
        return JsonDatabase.findById('trends', id);
    }
    static findAll(limit = 50) {
        const trends = JsonDatabase.get('trends');
        return trends
            .sort((a, b) => new Date(b.created_at || '').getTime() -
            new Date(a.created_at || '').getTime())
            .slice(0, limit);
    }
    static findBySource(source, limit = 20) {
        const trends = JsonDatabase.findAllByField('trends', 'source', source);
        return trends
            .sort((a, b) => new Date(b.created_at || '').getTime() -
            new Date(a.created_at || '').getTime())
            .slice(0, limit);
    }
    static delete(id) {
        const deleted = JsonDatabase.delete('trends', id);
        if (deleted) {
            logger.info(`Deleted trend ${id}`);
        }
        return deleted;
    }
}
//# sourceMappingURL=Trend.js.map