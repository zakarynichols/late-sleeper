import { Hour } from "./Hour";
import { Minute } from "./Minute";
import { Period } from "./Period";

export function TimeForm(): JSX.Element {
  return (
    <form id="times">
      <Hour />
      <Minute />
      <Period />
      <button type="submit">Submit</button>
    </form>
  );
}
