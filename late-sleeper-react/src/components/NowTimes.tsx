export function NowTimes() {
  const [first, second, third, fourth] = ["first", "second", "third", "fourth"]; // TODO: Compute state from user input

  return (
    <div>
      <div>
        <strong>
          If you're going to sleep now and wan't the best times to wake up, try
          this:
        </strong>
      </div>
      <button type="submit">Submit</button>
      <div>
        {first}
        <span>, or </span>
        {second}
        <span>, or </span>
        {third}
        <span>, or </span>
        {fourth}
      </div>
    </div>
  );
}
