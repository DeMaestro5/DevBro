import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface Config {
  github: {
    token: string;
    username: string;
  };
  ai: {
    apiKey: string;
  };
  email: {
    user: string;
    pass: string;
    to: string;
  };
  discord: {
    webhookUrl: string;
  };
}

const requiredEnvVars = [
  'GITHUB_TOKEN',
  'GITHUB_USERNAME',
  'AI_API_KEY',
  'EMAIL_USER',
  'EMAIL_PASS',
  'YOUR_EMAIL',
];

// Validate required environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const logDirectory = process.env.LOG_DIR;
export const environment = process.env.NODE_ENV;

export const config: Config = {
  github: {
    token: process.env.GITHUB_TOKEN!,
    username: process.env.GITHUB_USERNAME!,
  },
  ai: {
    apiKey: process.env.AI_API_KEY!,
  },
  email: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
    to: process.env.YOUR_EMAIL!,
  },
  discord: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL!,
  },
};
