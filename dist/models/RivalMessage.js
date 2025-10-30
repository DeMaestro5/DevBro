import { JsonDatabase } from '../config/database.js';
import { logger } from '../utils/logger.js';
export class RivalMessageModel {
    static create(message) {
        const newMessage = JsonDatabase.insert('rival_messages', message);
        logger.info(`Created rival message: ${message.message.substring(0, 50)}...`);
        return newMessage;
    }
    static findById(id) {
        return JsonDatabase.findById('rival_messages', id);
    }
    static findAll(limit = 50) {
        const messages = JsonDatabase.get('rival_messages');
        return messages
            .sort((a, b) => new Date(b.created_at || '').getTime() -
            new Date(a.created_at || '').getTime())
            .slice(0, limit);
    }
    static findByType(messageType) {
        return JsonDatabase.findAllByField('rival_messages', 'message_type', messageType);
    }
    static delete(id) {
        const deleted = JsonDatabase.delete('rival_messages', id);
        if (deleted) {
            logger.info(`Deleted rival message ${id}`);
        }
        return deleted;
    }
}
//# sourceMappingURL=RivalMessage.js.map