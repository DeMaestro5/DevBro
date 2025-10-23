"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendModel = void 0;
const database_1 = require("../config/database");
const logger_1 = require("../utils/logger");
class TrendModel {
    static create(trend) {
        const newTrend = database_1.JsonDatabase.insert('trends', trend);
        logger_1.logger.info(`Created trend: ${trend.title}`);
        return newTrend;
    }
    static findById(id) {
        return database_1.JsonDatabase.findById('trends', id);
    }
    static findAll(limit = 50) {
        const trends = database_1.JsonDatabase.get('trends');
        return trends
            .sort((a, b) => new Date(b.created_at || '').getTime() -
            new Date(a.created_at || '').getTime())
            .slice(0, limit);
    }
    static findBySource(source, limit = 20) {
        const trends = database_1.JsonDatabase.findAllByField('trends', 'source', source);
        return trends
            .sort((a, b) => new Date(b.created_at || '').getTime() -
            new Date(a.created_at || '').getTime())
            .slice(0, limit);
    }
    static delete(id) {
        const deleted = database_1.JsonDatabase.delete('trends', id);
        if (deleted) {
            logger_1.logger.info(`Deleted trend ${id}`);
        }
        return deleted;
    }
}
exports.TrendModel = TrendModel;
//# sourceMappingURL=Trend.js.map