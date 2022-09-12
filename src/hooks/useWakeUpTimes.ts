export const useWakeUpTimes = (hours: number, minutes: number) => {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate();
  const calculatedTimes = [
    { hours: hours - 9, minutes },
    { hours: hours - 7, minutes: minutes - 30 },
    { hours: hours - 6, minutes },
    { hours: hours - 4, minutes: minutes - 30 },
  ];
  const dates = calculatedTimes.map((times) => {
    return new Date(year, month, day, times.hours, times.minutes);
  });

  return {
    subtract: () => {
      dates.forEach((date) => {
        const hours = date.getHours() - 12;
        date.setHours(hours);
      });
    },
    add: () => {
      dates.forEach((date) => {
        const hours = date.getHours() + 12;
        date.setHours(hours);
      });
    },
    cycles: dates,
  };
};
