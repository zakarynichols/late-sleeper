export type Hour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export function isHour(hour: number): hour is Hour {
  return hour >= 0 && hour <= 12;
}
