import { Route, Routes } from "react-router-dom";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectCaseStudyPage from "./ProjectCaseStudyPage";
import { renderRoute } from "../test/render";

describe("ProjectCaseStudyPage", () => {
  it("renders the requested case study from the typed project model", () => {
    renderRoute(
      <Routes>
        <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
      </Routes>,
      "/projects/human-capital-management-system"
    );

    expect(screen.getByRole("heading", { level: 1, name: "Human Capital Management System" })).toBeInTheDocument();
    expect(screen.getByText(/implemented backend business logic for time-in and time-out/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open live project/i })).toHaveAttribute(
      "href",
      "https://assessmenthcmsystem.onrender.com/login"
    );
  });
});
