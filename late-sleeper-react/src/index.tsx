import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

const rootEl = document.getElementById("root");

if (rootEl === null) {
  throw new Error("root element is not defined");
}

const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
