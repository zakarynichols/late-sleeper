// Would like to find a better solution. Is a computed strongly typed minutes type possible? e.g. type Minutes = 0 | 1 | 2 | 3 | and so on...

import { ChangeEvent } from "react";
import { isMinute, Minute } from "../time/Minute";

/**
 * This could be defined inside off the render and wrapped in useMemo.
 * This is better since there isn't a need to derive/compute from props
 * and can live in module scope.
 */
const supportedMinutes: Minute[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60,
];

type MinuteSelectProps = {
  dispatch: (minute: Minute) => void;
  state: Minute;
};
export function MinuteSelect(props: MinuteSelectProps) {
  return (
    <div>
      <label htmlFor="minute-select">Minute:</label>
      <select name="minute" id="minute-select" onChange={handleChange}>
        <option value="">Minute...</option>
        {supportedMinutes.map((minute) => {
          return (
            <option value={minute} key={minute}>
              {minute}
            </option>
          );
        })}
      </select>
    </div>
  );

  function handleChange(ev: ChangeEvent<HTMLSelectElement>) {
    const minute = parseInt(ev.currentTarget.value);
    if (!isMinute(minute)) return;
    void props.dispatch(minute);
  }
}
