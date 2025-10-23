"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = require("./utils/logger");
const app = new app_1.DevBroApp();
// Start the application
app.start().catch((error) => {
    logger_1.logger.error('Failed to start DevBro:', error);
    process.exit(1);
});
// Handle graceful shutdown
process.on('SIGINT', async () => {
    logger_1.logger.info('Received SIGINT, shutting down gracefully...');
    await app.stop();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    logger_1.logger.info('Received SIGTERM, shutting down gracefully...');
    await app.stop();
    process.exit(0);
});
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger_1.logger.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    logger_1.logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
//# sourceMappingURL=server.js.map