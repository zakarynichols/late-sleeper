import { querySelectorOrThrow } from "../utils";

export function useErrorElement() {
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
