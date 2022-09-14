export function Minute() {
  return (
    <div>
      <label htmlFor="minute-select">Minute:</label>
      <select name="minute" id="minute-select">
        <option value="">Minute...</option>
        <option value="00">00</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
    </div>
  );
}
