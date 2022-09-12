import { useErrorEvents } from "./hooks/useErrors.js";
import { use12HourClock } from "./hooks/use12HourClock.js";
import { useTimeInputs } from "./hooks/useTimeInputs.js";
import { useWakeUpTimes as useBedTimes } from "./hooks/useBedTimes.js";
import { querySelectorOrThrow } from "./utils.js";

/* Render the calculated sleep times to the DOM or remove them if null. */
function render(times: string[] | null): void {
  const results = querySelectorOrThrow<HTMLDivElement>("#results");

  if (times === null) {
    results.innerHTML = "";
    return;
  }

  const [first, second, third, fourth] = times;

  results.innerHTML = `
    You should go to bed at:
    <div class="cycle-color">
        ${first}<span class="commas">, or</span>
        ${second}<span class="commas">, or</span>
        ${third}<span class="commas">, or</span>
        ${fourth}
    </div>
    `;
}

/**
 * Submit event handler callback composed of hooks get, sanitize, calculate, and render the new times.
 */
export function handleSubmit() {
  const { hour, minute, period } = useTimeInputs();

  const errors = useErrorEvents();

  if (hour === null || minute === null || period === "") {
    errors.show("You must fill in the fields.");
    render(null);
  } else {
    errors.remove();

    const bedTimes = useBedTimes(hour, minute, period === "AM" ? "AM" : "PM");

    const hour12Times = use12HourClock(bedTimes);

    render(hour12Times);
  }
}

// const getSleepCyclesNow = () => {
//   const time = new Date();
//   const year = time.getFullYear();
//   const month = time.getMonth();
//   const day = time.getDay();
//   const hours = time.getHours();
//   const minutes = time.getMinutes();

//   const hoursAndMins = [
//     { hours: hours + 9, minutes },
//     { hours: hours + 7, minutes: minutes + 30 },
//     { hours: hours + 6, minutes },
//     { hours: hours + 4, minutes: minutes + 30 },
//   ];

//   const cycles = hoursAndMins.map((hourAndMin) => {
//     return new Date(year, month, day, hourAndMin.hours, hourAndMin.minutes);
//   });

//   return cycles;
// };

// const getWakeUpTimesNow = (): void => {
//   const resultsNow = querySelectorOrThrow<HTMLDivElement>("#results-now");

//   const sleepCycles = getSleepCyclesNow();

//   const cycles = useHour12Times(sleepCycles);

//   resultsNow.innerHTML = `
//     You should wake up at:
//     <div class="cycle-color">
//         ${cycles[0]}<span class="commas">, or</span>
//         ${cycles[1]}<span class="commas">, or</span>
//         ${cycles[2]}<span class="commas">, or</span>
//         ${cycles[3]}
//     </div>
//     `;
// };

// const calcNow = querySelectorOrThrow<HTMLButtonElement>("#calc-now");
// calcNow.addEventListener("click", (e) => {
//   e.preventDefault();
//   getWakeUpTimesNow();
// });
