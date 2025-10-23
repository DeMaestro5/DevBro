export declare class EmailService {
    private transporter;
    constructor();
    sendEmail(options: {
        to: string;
        subject: string;
        text: string;
    }): Promise<void>;
    getConfig(): {
        user: string;
        pass: string;
        to: string;
    };
}
//# sourceMappingURL=emailService.d.ts.map