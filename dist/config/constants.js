"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIFFICULTY_LEVELS = exports.TONE_TYPES = exports.MESSAGE_TYPES = exports.CRON_SCHEDULES = void 0;
exports.CRON_SCHEDULES = {
    DAILY_CHECK: '0 9 * * *', // 9 AM daily
    WEEKLY_REPORT: '0 8 * * 1', // 8 AM Monday
    TREND_UPDATE: '0 */6 * * *', // Every 6 hours
    PROJECT_REMINDER: '0 17 * * *' // 5 PM daily
};
exports.MESSAGE_TYPES = {
    MOTIVATIONAL: 'motivational',
    CHALLENGE: 'challenge',
    ACHIEVEMENT: 'achievement',
    REMINDER: 'reminder'
};
exports.TONE_TYPES = {
    ENCOURAGING: 'encouraging',
    CHALLENGING: 'challenging',
    CELEBRATORY: 'celebratory',
    REMINDING: 'reminding'
};
exports.DIFFICULTY_LEVELS = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
    EXPERT: 'expert'
};
//# sourceMappingURL=constants.js.map