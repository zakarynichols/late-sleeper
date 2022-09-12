// DOM utilities

/* Simply the document.querySelector that throws if it can't find the element. */
export function querySelectorOrThrow<El extends HTMLElement>(
  selector: string
): El {
  const el = document.querySelector<El>(selector);
  if (el === null)
    throw new Error(`cannot find element with selector: ${selector}`);
  return el;
}

/* Create an element with sanitized HTML. Needs improvement when I have more time. */
export function createElementSafe<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  domString: string
) {
  // Declare element with extended setHTML type.
  const el: HTMLElementTagNameMap[K] & {
    setHTML?: (domString: string, options: { sanitizer: Sanitizer }) => void;
  } = document.createElement<K>(tagName);
  if (el.setHTML) {
    const sanitizer = new Sanitizer();
    el.setHTML(domString, { sanitizer });
    return el;
  } else {
    throw new Error("setHTML method is not defined");
  }
}
