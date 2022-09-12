import { querySelectorOrThrow } from "../utils.js";

/**
 * useTimeInputs gets the times from the respective DOM elements.
 * The hours and minutes will return null with no user input.
 */
export const useTimeInputs = () => {
  const hour = querySelectorOrThrow<HTMLInputElement>("select#hour").value;
  const minute = querySelectorOrThrow<HTMLInputElement>("select#minute").value;
  const period = querySelectorOrThrow<HTMLInputElement>("select#period").value;

  return {
    hour: hour === "" ? null : parseInt(hour),
    minute: minute === "" ? null : parseInt(minute),
    period,
  };
};
