import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";
import { renderRoute } from "../test/render";

describe("HomePage", () => {
  it("renders Marc's positioning and the three verified projects", () => {
    renderRoute(<HomePage />);

    expect(screen.getByRole("heading", { name: /turn complicated operations/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Human Capital Management System" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "SkillTest Indonesia Platform" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "HSHR School Organization" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore selected work/i })).toHaveAttribute("href", "/projects");
  });
});
