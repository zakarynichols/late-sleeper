import { createElementSafe, querySelectorOrThrow } from "../dom.js";
import { use12HourClock } from "../hooks/use12HourClock.js";
import { useBedTimes } from "../hooks/useBedTimes.js";
import { useErrorEvents } from "../hooks/useErrors.js";
import { useTimeInputs } from "../hooks/useTimeInputs.js";

export function bedTimesElement(bedTimes: string[]): HTMLDivElement {
  if (bedTimes.length !== 4) {
    throw new Error(`wrong length for bedTimes: ${bedTimes.length}`);
  }

  const [first, second, third, fourth] = bedTimes;

  const bedTimesEl = createElementSafe(
    "div",
    `
    You should go to bed at:
    <div class="cycle-color">
        ${first}<span class="comma">, or</span>
        ${second}<span class="comma">, or</span>
        ${third}<span class="comma">, or</span>
        ${fourth}
    </div>
    `
  );

  // Return the div ready to be appended to the body
  return bedTimesEl;
}

/**
 * Submit event handler callback composed of hooks get, sanitize, calculate, and render the new times.
 */
export function handleSubmit() {
  const results = querySelectorOrThrow<HTMLDivElement>("#results");

  const { hour, minute, period } = useTimeInputs();

  const errors = useErrorEvents();

  if (hour === null || minute === null || period === "") {
    errors.show("You must fill in the fields.");
    results.replaceChildren("");
  } else {
    errors.remove();

    const bedTimes = useBedTimes(hour, minute, period === "AM" ? "AM" : "PM");

    const hour12Times = use12HourClock(bedTimes);

    const bedTimesEl = bedTimesElement(hour12Times);
    results.replaceChildren(bedTimesEl);
  }
}
