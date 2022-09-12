/**
 * useHour12Times converts an array of Date instances
 * to an array of friendly 12 hour strings.
 */
export function use12HourClock(dates: Date[]): string[] {
  return dates.map((date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  });
}
