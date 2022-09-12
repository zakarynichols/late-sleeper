import { querySelectorOrThrow } from "../dom.js";

/**
 * useErrorEvents returns callbacks to show and remove the text and classNames
 * associated with the error element in the document.
 */
export function useErrorEvents() {
  const errorEl = querySelectorOrThrow<HTMLDivElement>("#errors");
  const className = "error";

  return {
    show: (text: string) => {
      errorEl.textContent = text;
      errorEl.classList.add(className);
    },
    remove: () => {
      errorEl.textContent = null;
      errorEl.classList.remove(className);
    },
  };
}
