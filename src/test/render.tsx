import { render, type RenderResult } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../hooks/useTheme";

export function renderRoute(ui: ReactElement, initialEntry = "/"): RenderResult {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialEntry]}>{ui}</MemoryRouter>
    </ThemeProvider>
  );
}
