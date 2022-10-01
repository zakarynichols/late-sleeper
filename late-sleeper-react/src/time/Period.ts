export type Period = "" | "AM" | "PM";

export function isPeriod(period: string): period is Period {
  return period === "" || period === "AM" || period === "PM";
}
