export function BedTimes() {
  const [first, second, third, fourth] = ["first", "second", "third", "fourth"]; // TODO: Compute state from user input
  return (
    <div>
      {first}
      <span>, or </span>
      {second}
      <span>, or </span>
      {third}
      <span>, or </span>
      {fourth}
    </div>
  );
}
