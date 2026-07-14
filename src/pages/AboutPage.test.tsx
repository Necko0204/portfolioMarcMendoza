import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderRoute } from "../test/render";
import AboutPage from "./AboutPage";

describe("AboutPage", () => {
  it("leads with executive VA experience and shows current freelance work", () => {
    renderRoute(<AboutPage />);

    const experienceHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(experienceHeadings[0]).toHaveTextContent("Executive Virtual Assistant");
    expect(screen.getByRole("heading", { level: 3, name: "Full-Stack Web Developer (Freelance)" })).toBeInTheDocument();
  });
});
