"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.environment = exports.logDirectory = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const requiredEnvVars = [
    'GITHUB_TOKEN',
    'GITHUB_USERNAME',
    'AI_API_KEY',
    'EMAIL_USER',
    'EMAIL_PASS',
    'YOUR_EMAIL',
    'DISCORD_WEBHOOK_URL'
];
// Validate required environment variables
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}
exports.logDirectory = process.env.LOG_DIR;
exports.environment = process.env.NODE_ENV;
exports.config = {
    github: {
        token: process.env.GITHUB_TOKEN,
        username: process.env.GITHUB_USERNAME
    },
    ai: {
        apiKey: process.env.AI_API_KEY
    },
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        to: process.env.YOUR_EMAIL
    },
    discord: {
        webhookUrl: process.env.DISCORD_WEBHOOK_URL
    },
};
//# sourceMappingURL=env.js.map