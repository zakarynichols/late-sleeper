import { ChangeEvent } from "react";
import { Hour, isHour } from "../time/Hour";

const supportedHours: Hour[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

type HourSelectProps = {
  dispatch: (hour: Hour) => void;
  state: Hour;
};

export function HourSelect(props: HourSelectProps) {
  return (
    <div>
      <label htmlFor="hour-select">Hour:</label>
      <select
        name="hour"
        id="hour-select"
        value={props.state}
        onChange={handleChange} // No reference equality checks are required in event-handlers.
      >
        <option value={0}>Hour...</option>
        {supportedHours.map((hour) => {
          return (
            <option value={hour} key={hour}>
              {hour}
            </option>
          );
        })}
      </select>
    </div>
  );

  function handleChange(ev: ChangeEvent<HTMLSelectElement>) {
    const hour = parseInt(ev.currentTarget.value);
    if (!isHour(hour)) return;
    void props.dispatch(hour);
  }
}
