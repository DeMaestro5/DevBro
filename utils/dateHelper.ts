export class DateHelper {
  static getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  static getYesterday(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }
  
  static getWeekAgo(): string {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return weekAgo.toISOString().split('T')[0];
  }
  
  static getMonthAgo(): string {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return monthAgo.toISOString().split('T')[0];
  }
  
  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  
  static isStale(lastCommitDate: string, daysThreshold: number = 30): boolean {
    const lastCommit = new Date(lastCommitDate);
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - daysThreshold);
    return lastCommit < threshold;
  }
}
