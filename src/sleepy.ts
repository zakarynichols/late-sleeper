import { useErrorElement } from "./hooks/useErrorElement";
import { useTimeInputs } from "./hooks/useTimeInputs";
import { useWakeUpTimes } from "./hooks/useWakeUpTimes";
import { querySelectorOrThrow } from "./utils";

type Time = { hour: string; minute: string; period: string };

const isEmpty = (params: Time): boolean => {
  if (params.hour === "" || params.minute === "" || params.period === "") {
    return true;
  }
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

const render = (sleepCycles: string[] | null): void => {
  const results = querySelectorOrThrow<HTMLDivElement>("#results");

  if (sleepCycles === null) {
    results.innerHTML = "";
    return;
  }

  results.innerHTML = `
    You should go to bed at:
    <div class="cycle-color">
        ${sleepCycles[0]}<span class="commas">, or</span>
        ${sleepCycles[1]}<span class="commas">, or</span>
        ${sleepCycles[2]}<span class="commas">, or</span>
        ${sleepCycles[3]}
    </div>
    `;
};

const getWakeUpTimes = (): void => {
  const { hour, minute, period } = useTimeInputs();
  const errors = useErrorElement();

  if (isEmpty({ hour, minute, period })) {
    errors.show("You must fill in the fields.");
    render(null);
  } else {
    errors.remove();

    const wakeUpTimes = useWakeUpTimes(parseInt(hour), parseInt(minute));

    debugger;

    if (period === "PM") {
      wakeUpTimes.subtract();
    }

    if (hour === "12") {
      wakeUpTimes.add();
    }

    render(toTwelveHourTime(wakeUpTimes.cycles));
  }
};

const form = querySelectorOrThrow<HTMLFormElement>("#calculate");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWakeUpTimes();
});

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
  const resultsNow = querySelectorOrThrow<HTMLDivElement>("#results-now");

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

const calcNow = querySelectorOrThrow<HTMLButtonElement>("#calc-now");
calcNow.addEventListener("click", (e) => {
  e.preventDefault();
  getWakeUpTimesNow();
});

window.addEventListener("error", (ev) => {
  console.error(ev);
  if (ev.error instanceof Error) {
    const bodyStyle = document.body.style;

    bodyStyle.backgroundColor = "red";
    bodyStyle.color = "white";
    bodyStyle.textAlign = "center";
    bodyStyle.marginTop = "20px";

    document.body.textContent =
      "A fatal error has occurred. Please try reloading the page.";
  }
});
