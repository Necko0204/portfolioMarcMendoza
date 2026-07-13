import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./SiteHeader";
import { renderRoute } from "../../test/render";

describe("SiteHeader", () => {
  it("opens the mobile navigation and closes it with Escape", () => {
    renderRoute(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: /open navigation menu/i });

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /^work$/i })).toBeVisible();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });
});
