"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbHelper = void 0;
const database_1 = require("../config/database");
const logger_1 = require("./logger");
class DbHelper {
    static async getStats() {
        try {
            const stats = {
                totalActivities: database_1.JsonDatabase.get('activities').length,
                totalProjects: database_1.JsonDatabase.get('projects').length,
                totalMessages: database_1.JsonDatabase.get('rival_messages').length,
                totalChallenges: database_1.JsonDatabase.get('challenges').length,
                totalTrends: database_1.JsonDatabase.get('trends').length,
                activeChallenges: database_1.JsonDatabase.get('challenges').filter((c) => !c.is_completed).length,
                staleProjects: database_1.JsonDatabase.get('projects').filter((p) => p.is_stale).length,
            };
            return stats;
        }
        catch (error) {
            logger_1.logger.error('Error getting database stats:', error);
            throw error;
        }
    }
    static async executeQuery(table, filter) {
        try {
            const data = database_1.JsonDatabase.get(table);
            if (filter) {
                return data.filter(filter);
            }
            return data;
        }
        catch (error) {
            logger_1.logger.error('Database query error:', error);
            throw error;
        }
    }
}
exports.DbHelper = DbHelper;
//# sourceMappingURL=dbHelper.js.map