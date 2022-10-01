import { useReducer } from "react";
import { Hour } from "../time/Hour";
import { Minute } from "../time/Minute";
import { Period } from "../time/Period";

type HourAction = "hour";
type MinuteAction = "minute";
type PeriodAction = "period";

type TimeState = {
  hour: Hour;
  minute: Minute;
  period: Period;
};

type TimeAction =
  | { type: HourAction; value: Hour }
  | { type: MinuteAction; value: Minute }
  | { type: PeriodAction; value: Period };

function reducer(state: TimeState, action: TimeAction) {
  switch (action.type) {
    case "hour":
      return {
        ...state,
        hour: action.value,
      };
    case "minute":
      return {
        ...state,
        minute: action.value,
      };
    case "period":
      return {
        ...state,
        period: action.value,
      };
    default:
      throw new Error(`unexpected ${reducer.name} action: ${action}`);
  }
}

const initialState: TimeState = {
  hour: 0,
  minute: 0,
  period: "",
};

/**
 * Hook for setting state in 12-hour clock convention.
 */
export function useTimeReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
}
