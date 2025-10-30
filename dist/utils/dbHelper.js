import { JsonDatabase } from '../config/database';
import { logger } from './logger';
export class DbHelper {
    static async getStats() {
        try {
            const stats = {
                totalActivities: JsonDatabase.get('activities').length,
                totalProjects: JsonDatabase.get('projects').length,
                totalMessages: JsonDatabase.get('rival_messages').length,
                totalChallenges: JsonDatabase.get('challenges').length,
                totalTrends: JsonDatabase.get('trends').length,
                activeChallenges: JsonDatabase.get('challenges').filter((c) => !c.is_completed).length,
                staleProjects: JsonDatabase.get('projects').filter((p) => p.is_stale).length,
            };
            return stats;
        }
        catch (error) {
            logger.error('Error getting database stats:', error);
            throw error;
        }
    }
    static async executeQuery(table, filter) {
        try {
            const data = JsonDatabase.get(table);
            if (filter) {
                return data.filter(filter);
            }
            return data;
        }
        catch (error) {
            logger.error('Database query error:', error);
            throw error;
        }
    }
}
//# sourceMappingURL=dbHelper.js.map