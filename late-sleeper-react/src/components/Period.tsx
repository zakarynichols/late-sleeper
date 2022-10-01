import { ChangeEvent } from "react";
import { isPeriod, Period } from "../time/Period";

const supportedPeriods: Period[] = ["AM", "PM"];

type PeriodSelectProps = {
  dispatch: (period: Period) => void;
  state: Period;
};
export function PeriodSelect(props: PeriodSelectProps) {
  return (
    <div>
      <label htmlFor="period-select">Period:</label>
      <select name="period" id="period-select" onChange={handleChange}>
        <option value="">AM or PM...</option>
        {supportedPeriods.map((period) => {
          return (
            <option value={period} key={period}>
              {period}
            </option>
          );
        })}
      </select>
    </div>
  );

  function handleChange(ev: ChangeEvent<HTMLSelectElement>) {
    const period = ev.currentTarget.value;
    if (!isPeriod(period)) return;
    void props.dispatch(period);
  }
}
