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
}
