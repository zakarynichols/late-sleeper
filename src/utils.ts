export function querySelectorOrThrow<E extends HTMLElement>(
  selector: string
): E {
  const el = document.querySelector<E>(selector);
  if (el === null)
    throw new Error(`cannot find element with selector: ${selector}`);
  return el;
}
