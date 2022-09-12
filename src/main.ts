import { handleSubmit } from "./sleepy.js";
import { querySelectorOrThrow } from "./utils.js";

function main() {
  // Global error handler
  window.addEventListener("error", (ev) => {
    console.error(ev);
    if (ev.error instanceof Error) {
      const bodyStyle = document.body.style;

      bodyStyle.backgroundColor = "red";
      bodyStyle.color = "white";
      bodyStyle.textAlign = "center";
      bodyStyle.marginTop = "20px";

      document.body.textContent =
        "A fatal error has occurred. Please try reloading the page.";
    }
  });

  /* Element and event handler when submitting times. */
  const form = querySelectorOrThrow<HTMLFormElement>("#calculate");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit();
  });
}

main();
