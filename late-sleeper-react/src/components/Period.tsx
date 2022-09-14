export function Period() {
  return (
    <div>
      <label htmlFor="period-select">Period:</label>
      <select name="period" id="period-select">
        <option value="">AM or PM...</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}
