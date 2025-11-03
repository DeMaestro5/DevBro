export const CRON_SCHEDULES = {
  DAILY_CHECK: '0 18 * * *', // 7 PM daily
  WEEKLY_REPORT: '0 8 * * 1', // 8 AM Monday
  TREND_UPDATE: '0 */6 * * *', // Every 6 hours
  PROJECT_REMINDER: '0 17 * * *', // 5 PM daily
};

export const MESSAGE_TYPES = {
  MOTIVATIONAL: 'motivational',
  CHALLENGE: 'challenge',
  ACHIEVEMENT: 'achievement',
  REMINDER: 'reminder',
} as const;

export const TONE_TYPES = {
  ENCOURAGING: 'encouraging',
  CHALLENGING: 'challenging',
  CELEBRATORY: 'celebratory',
  REMINDING: 'reminding',
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  EXPERT: 'expert',
} as const;
