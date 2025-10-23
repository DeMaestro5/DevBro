import { NotificationMessage } from '../../types/notification.types';
export declare class NotificationService {
    private emailService;
    private discordService;
    constructor();
    sendNotification(message: NotificationMessage): Promise<void>;
    private getColorByType;
}
//# sourceMappingURL=notificationService.d.ts.map