export const useWakeUpTimes = (
  hours: number,
  minutes: number,
  period: "AM" | "PM"
) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const bedTimes = [
    { hours: hours - 9, minutes },
    { hours: hours - 7, minutes: minutes - 30 },
    { hours: hours - 6, minutes },
    { hours: hours - 4, minutes: minutes - 30 },
  ];

  const times = bedTimes.map((times) => {
    return new Date(year, month, day, times.hours, times.minutes);
  });

  // Subtract twelve hours if the period is PM
  if (period === "PM") {
    times.forEach((date) => {
      const hours = date.getHours() - 12;
      date.setHours(hours);
    });
  }

  // Add twelve hours if the hour is 12
  if (hours === 12) {
    times.forEach((date) => {
      const hours = date.getHours() + 12;
      date.setHours(hours);
    });
  }

  return times;
};
