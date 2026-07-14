import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderRoute } from "../test/render";
import AboutPage from "./AboutPage";

describe("AboutPage", () => {
  it("shows Marc's current freelance and Malaysia customer-service experience", () => {
    renderRoute(<AboutPage />);

    expect(screen.getByRole("heading", { level: 3, name: "Full-Stack Web Developer (Freelance)" })).toBeInTheDocument();
    expect(screen.getByText("CoBnB Malaysia")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Customer Service Specialist" })).toBeInTheDocument();
  });
});
