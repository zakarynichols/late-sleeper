import { FormEvent } from "react";
import { useTimeReducer } from "../hooks/useTimeReducer";
import { Hour } from "../time/Hour";
import { Minute } from "../time/Minute";
import { Period } from "../time/Period";
import { HourSelect } from "./Hour";
import { MinuteSelect } from "./Minute";
import { PeriodSelect } from "./Period";

export function TimeForm(): JSX.Element {
  const { state, dispatch } = useTimeReducer();

  return (
    <form className="time-form" onSubmit={handleSubmit}>
      <HourSelect dispatch={handleHour} state={state.hour} />
      <MinuteSelect dispatch={handleMinute} state={state.minute} />
      <PeriodSelect dispatch={handlePeriod} state={state.period} />
      <button type="submit">Submit</button>
    </form>
  );

  /**
   * A series of event-handler callbacks.
   * They are also closures, which provide
   * the terse template syntax above.
   *
   * Note: There is no use of useCallback. Event handlers do not perform reference equality checks
   * and can be passed new functions each render. If these were used in dependency arrays
   */
  function handleSubmit(ev: FormEvent) {
    void ev.preventDefault();
    console.log("submitted form with state: ", state);
  }

  function handleHour(hour: Hour) {
    void dispatch({ type: "hour", value: hour });
  }

  function handleMinute(minute: Minute) {
    void dispatch({ type: "minute", value: minute });
  }

  function handlePeriod(period: Period) {
    void dispatch({ type: "period", value: period });
  }
}
