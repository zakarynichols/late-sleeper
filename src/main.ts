import { querySelectorOrThrow } from "./dom.js";
import { handleSubmit } from "./components/bedTimesElement.js";

function main() {
  // Global error handler
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

  const form = querySelectorOrThrow<HTMLFormElement>("#calculate");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit();
  });
}

main();

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
