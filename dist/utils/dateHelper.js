"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
class DateHelper {
    static getToday() {
        return new Date().toISOString().split('T')[0];
    }
    static getYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    }
    static getWeekAgo() {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return weekAgo.toISOString().split('T')[0];
    }
    static getMonthAgo() {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return monthAgo.toISOString().split('T')[0];
    }
    static formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    static isStale(lastCommitDate, daysThreshold = 30) {
        const lastCommit = new Date(lastCommitDate);
        const threshold = new Date();
        threshold.setDate(threshold.getDate() - daysThreshold);
        return lastCommit < threshold;
    }
}
exports.DateHelper = DateHelper;
//# sourceMappingURL=dateHelper.js.map