import { JsonDatabase } from '../config/database';
import { logger } from '../utils/logger';

export interface RivalMessage {
  id?: number;
  message: string;
  message_type?: string;
  tone?: string;
  activity_id?: number;
  created_at?: string;
}

export class RivalMessageModel {
  static create(
    message: Omit<RivalMessage, 'id' | 'created_at'>,
  ): RivalMessage {
    const newMessage = JsonDatabase.insert('rival_messages', message);
    logger.info(
      `Created rival message: ${message.message.substring(0, 50)}...`,
    );
    return newMessage;
  }

  static findById(id: number): RivalMessage | null {
    return JsonDatabase.findById('rival_messages', id);
  }

  static findAll(limit: number = 50): RivalMessage[] {
    const messages = JsonDatabase.get('rival_messages');
    return messages
      .sort(
        (a: RivalMessage, b: RivalMessage) =>
          new Date(b.created_at || '').getTime() -
          new Date(a.created_at || '').getTime(),
      )
      .slice(0, limit);
  }

  static findByType(messageType: string): RivalMessage[] {
    return JsonDatabase.findAllByField(
      'rival_messages',
      'message_type',
      messageType,
    );
  }

  static delete(id: number): boolean {
    const deleted = JsonDatabase.delete('rival_messages', id);
    if (deleted) {
      logger.info(`Deleted rival message ${id}`);
    }
    return deleted;
  }
}
