import { querySelectorOrThrow } from "../utils";

export const useTimeInputs = () => {
  const hour = querySelectorOrThrow<HTMLInputElement>("select#hour").value;
  const minute = querySelectorOrThrow<HTMLInputElement>("select#minute").value;
  const period = querySelectorOrThrow<HTMLInputElement>("select#period").value;

  return { hour, minute, period };
};
