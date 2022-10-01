function handleError(params: { onError: () => void; ui?: () => Element }) {
  params.onError();
  if (params.ui !== undefined) {
    const el = params.ui();
    document.body.replaceChildren(el);
  }
}

export function errorEventListener<
  K extends keyof Pick<WindowEventMap, "error" | "unhandledrejection">
>(type: K, onError: (ev: WindowEventMap[K]) => void, ui?: () => Element) {
  window.addEventListener(type, (ev) => {
    handleError({ onError: () => onError(ev), ui });
  });
}
