export const getDateID = (date: Date): string => `Y${date.getFullYear()}-W${date.getWeek()}`;
