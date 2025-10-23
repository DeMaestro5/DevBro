"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RivalMessageModel = void 0;
const database_1 = require("../config/database");
const logger_1 = require("../utils/logger");
class RivalMessageModel {
    static create(message) {
        const newMessage = database_1.JsonDatabase.insert('rival_messages', message);
        logger_1.logger.info(`Created rival message: ${message.message.substring(0, 50)}...`);
        return newMessage;
    }
    static findById(id) {
        return database_1.JsonDatabase.findById('rival_messages', id);
    }
    static findAll(limit = 50) {
        const messages = database_1.JsonDatabase.get('rival_messages');
        return messages
            .sort((a, b) => new Date(b.created_at || '').getTime() -
            new Date(a.created_at || '').getTime())
            .slice(0, limit);
    }
    static findByType(messageType) {
        return database_1.JsonDatabase.findAllByField('rival_messages', 'message_type', messageType);
    }
    static delete(id) {
        const deleted = database_1.JsonDatabase.delete('rival_messages', id);
        if (deleted) {
            logger_1.logger.info(`Deleted rival message ${id}`);
        }
        return deleted;
    }
}
exports.RivalMessageModel = RivalMessageModel;
//# sourceMappingURL=RivalMessage.js.map