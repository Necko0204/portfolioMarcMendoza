import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("motion accessibility", () => {
  it("provides a reduced-motion override for animations and smooth scrolling", () => {
    const css = fs.readFileSync(path.resolve("src/styles/globals.css"), "utf8");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("scroll-behavior: auto !important");
    expect(css).toContain("transition-duration: 0.01ms !important");
  });
});
