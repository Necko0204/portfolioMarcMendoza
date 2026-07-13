import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DashboardPage from "./DashboardPage";
import { listAdminContacts } from "../services/api";
import { renderRoute } from "../test/render";
import type * as ApiModule from "../services/api";

vi.mock("../services/firebaseAuth", () => ({
  observeAdminUser: vi.fn((callback: (user: null) => void) => {
    callback(null);
    return vi.fn();
  }),
  signInAdmin: vi.fn(),
  signOutAdmin: vi.fn(),
  getAdminToken: vi.fn()
}));

vi.mock("../services/api", async () => {
  const actual = await vi.importActual<typeof ApiModule>("../services/api");
  return { ...actual, listAdminContacts: vi.fn() };
});

describe("DashboardPage", () => {
  beforeEach(() => vi.mocked(listAdminContacts).mockReset());

  it("shows Firebase login and does not request contacts when signed out", async () => {
    renderRoute(<DashboardPage />, "/dashboard");

    expect(await screen.findByRole("heading", { name: /sign in with firebase/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(listAdminContacts).not.toHaveBeenCalled();
  });
});
