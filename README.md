# DevBro - Personal Developer Rival

A Node.js/TypeScript background service that monitors your GitHub activity and sends motivational messages to keep you coding!

## 🚀 Features

- **GitHub Activity Monitoring**: Tracks commits, PRs, and issues
- **AI-Powered Messages**: Generates motivational and challenging messages
- **Project Management**: Monitors repository health and staleness
- **Scheduled Jobs**: Automated daily checks, weekly reports, and reminders
- **Multiple Notifications**: Email and Discord notifications
- **Trend Monitoring**: Tracks trending technologies and repositories

## 🛠️ Tech Stack

- **Node.js** with **TypeScript**
- **JSON Database** (no SQLite compilation issues)
- **Winston** for logging
- **node-cron** for scheduling
- **Axios** for HTTP requests
- **Nodemailer** for email notifications

## 📁 Project Structure

```
src/devbro/
├── config/           # Configuration files
├── models/           # Database models
├── services/         # Business logic
├── jobs/             # Scheduled jobs
├── utils/            # Utility functions
├── types/            # TypeScript types
├── scripts/          # Utility scripts
├── app.ts            # Main application
└── server.ts         # Entry point
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `env.example` to `.env` and fill in your values:
```bash
cp env.example .env
```

Required environment variables:
- `GITHUB_TOKEN`: Your GitHub personal access token
- `GITHUB_USERNAME`: Your GitHub username
- `AI_API_KEY`: OpenAI API key
- `EMAIL_USER`: Your email address
- `EMAIL_PASS`: Your email app password
- `YOUR_EMAIL`: Email to receive notifications
- `DISCORD_WEBHOOK_URL`: Discord webhook URL

### 3. Development
```bash
npm run devbro:dev
```

### 4. Build and Run
```bash
npm run devbro:build
npm run devbro:start
```

## 📊 Available Scripts

- `npm run devbro:dev` - Start development server
- `npm run devbro:build` - Build TypeScript
- `npm run devbro:start` - Start production server
- `npm run devbro:test:db` - Test database connection
- `npm run devbro:stats` - View statistics
- `npm run devbro:test:daily` - Test daily check job

## 🗄️ Database Schema

The application uses JSON files with the following structure:
- `activities` - Daily GitHub activity
- `projects` - Repository information
- `rival_messages` - AI-generated messages
- `challenges` - Coding challenges
- `trends` - Technology trends

## ⏰ Scheduled Jobs

- **Daily Check** (9 AM): Monitors GitHub activity
- **Weekly Report** (Monday 8 AM): Sends weekly summary
- **Trend Update** (Every 6 hours): Updates technology trends
- **Project Reminder** (5 PM): Reminds about stale projects

## 🔧 Configuration

All configuration is handled through environment variables and the `src/devbro/config/` directory.

## 📝 Logging

Logs are stored in the `logs/` directory with daily rotation. Log levels:
- `error.log` - Error messages only
- `combined.log` - All log messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
