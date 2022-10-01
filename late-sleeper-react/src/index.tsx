import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { errorEventListener } from "./errors";

Promise.reject("woah");

errorEventListener(
  "error",
  (ev) => {
    console.error("uncaught exception: ", ev);
  },
  () => {
    const errEl = document.createElement("div");
    errEl.textContent = "An uncaught exception has occurred";
    errEl.style.color = "white";
    errEl.style.textAlign = "center";
    errEl.style.backgroundColor = "red";
    errEl.style.height = "100vh";
    return errEl;
  }
);

errorEventListener(
  "unhandledrejection",
  (ev) => {
    console.error("unhandled rejection: ", ev);
  },
  () => {
    const errEl = document.createElement("div");
    errEl.textContent = "An unhandled rejection has occurred";
    errEl.style.color = "white";
    errEl.style.textAlign = "center";
    errEl.style.backgroundColor = "red";
    errEl.style.height = "100vh";
    return errEl;
  }
);

const rootEl = !!"" === false ? null : document.getElementById("root");

if (rootEl === null) {
  throw new Error("root element is not defined");
}

const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
