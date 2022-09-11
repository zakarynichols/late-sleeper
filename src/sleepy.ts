const getSleepCycles = (hours: number, minutes: number): Date[] => {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDay();
  const hoursAndMins = [
    { hours: hours - 9, minutes },
    { hours: hours - 7, minutes: minutes - 30 },
    { hours: hours - 6, minutes },
    { hours: hours - 4, minutes: minutes - 30 },
  ];
  const cycles = hoursAndMins.map((hourAndMin) => {
    return new Date(year, month, day, hourAndMin.hours, hourAndMin.minutes);
  });

  return cycles;
};

const subtractTwelveHours = (sleepCyclesArray: Date[]): Date[] => {
  const copy: Date[] = sleepCyclesArray.map((s) => new Date(s.getTime()));
  return copy.map((sleepCycleObject) => {
    const hours: number = sleepCycleObject.getHours() - 12;
    sleepCycleObject.setHours(hours);
    return sleepCycleObject;
  });
};

const addTwelveHours = (sleepCyclesArray: Date[]): Date[] => {
  const copy: Date[] = sleepCyclesArray.map((s) => new Date(s.getTime()));
  return copy.map((sleepCycleObject) => {
    const hours: number = sleepCycleObject.getHours() + 12;
    sleepCycleObject.setHours(hours);
    return sleepCycleObject;
  });
};

const isEmpty = (hour: string, minute: string, period: string): boolean => {
  const errors = <HTMLElement>document.querySelector("div#errors");
  if (hour === "" || minute === "" || period === "") {
    errors.textContent = "You must fill in the fields.";
    errors.setAttribute("class", "error");
    return true;
  }
  errors.textContent = "";
  return false;
};

const toTwelveHourTime = (arr: Date[]): string[] => {
  const twelveHourArr: string[] = arr.map((obj) => {
    return obj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  });
  return twelveHourArr;
};

const getDOMelements = (): { hour: string; minute: string; period: string } => {
  const selectHours: string = (<HTMLInputElement>(
    document.querySelector("select#hour")
  )).value;
  const selectMinutes: string = (<HTMLInputElement>(
    document.querySelector("select#minute")
  )).value;
  const selectPeriod: string = (<HTMLInputElement>(
    document.querySelector("select#period")
  )).value;

  const hour: string = selectHours;
  const minute: string = selectMinutes;
  const period: string = selectPeriod;

  return { hour, minute, period };
};

const render = (isErrors: boolean, sleepCycles: string[]): string => {
  const results = <HTMLElement>document.querySelector("div#results");

  return !isErrors
    ? (results.innerHTML = `
    You should go to bed at:
    <div class="cycle-color">
        ${sleepCycles[0]}<span class="commas">, or</span>
        ${sleepCycles[1]}<span class="commas">, or</span>
        ${sleepCycles[2]}<span class="commas">, or</span>
        ${sleepCycles[3]}
    </div>
    `)
    : (results.textContent = "");
};

const getWakeUpTimes = (event: Event): void => {
  event.preventDefault();

  const elems = getDOMelements();

  const { hour, minute, period } = elems;

  const isErrors = isEmpty(hour, minute, period);

  const sleepCycles = getSleepCycles(parseInt(hour), parseInt(minute));

  if (period === "PM") {
    subtractTwelveHours(sleepCycles);
  }

  if (hour === "12") {
    addTwelveHours(sleepCycles);
  }

  render(isErrors, toTwelveHourTime(sleepCycles));
};

const form = <Element>document.querySelector("form#calculate");
form.addEventListener("submit", getWakeUpTimes);

const getSleepCyclesNow = () => {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDay();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const hoursAndMins = [
    { hours: hours + 9, minutes },
    { hours: hours + 7, minutes: minutes + 30 },
    { hours: hours + 6, minutes },
    { hours: hours + 4, minutes: minutes + 30 },
  ];

  const cycles = hoursAndMins.map((hourAndMin) => {
    return new Date(year, month, day, hourAndMin.hours, hourAndMin.minutes);
  });

  return cycles;
};

const getWakeUpTimesNow = (): void => {
  const resultsNow = document.querySelector("div#results-now");

  if (resultsNow === null) {
    throw new Error("cannot find div#results-now element");
  }

  const sleepCycles = getSleepCyclesNow();

  const cycles = toTwelveHourTime(sleepCycles);

  resultsNow.innerHTML = `
    You should wake up at:
    <div class="cycle-color">
        ${cycles[0]}<span class="commas">, or</span>
        ${cycles[1]}<span class="commas">, or</span>
        ${cycles[2]}<span class="commas">, or</span>
        ${cycles[3]}
    </div>
    `;
};

const calcNow = document.querySelector("button#calc-now");
calcNow?.addEventListener("click", getWakeUpTimesNow);
