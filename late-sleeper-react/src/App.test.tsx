import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders", () => {
  expect(() => render(<App />)).not.toThrow();
  expect(screen.getByText("App")).toBeInTheDocument();
});
