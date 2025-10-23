export interface NotificationConfig {
    email: {
        enabled: boolean;
        user: string;
        pass: string;
        to: string;
    };
    discord: {
        enabled: boolean;
        webhookUrl: string;
    };
}
export interface NotificationMessage {
    title: string;
    content: string;
    type: 'motivational' | 'challenge' | 'achievement' | 'reminder';
    priority: 'low' | 'medium' | 'high';
}
//# sourceMappingURL=notification.types.d.ts.map