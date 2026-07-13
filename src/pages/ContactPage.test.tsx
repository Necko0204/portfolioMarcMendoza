import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContactPage from "./ContactPage";
import { renderRoute } from "../test/render";

const fetchMock = vi.fn<typeof fetch>();

async function completeValidForm() {
  const user = userEvent.setup();
  await user.type(screen.getByRole("textbox", { name: /^name/i }), "Hiring Manager");
  await user.type(screen.getByRole("textbox", { name: /^email/i }), "hiring@example.com");
  await user.selectOptions(screen.getByRole("combobox", { name: /inquiry type/i }), "job-opportunity");
  await user.type(screen.getByRole("textbox", { name: /^message/i }), "I would like to discuss a full-stack developer role with Marc.");
  return user;
}

describe("ContactPage", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => vi.unstubAllGlobals());

  it("associates accessible validation errors with required fields", async () => {
    const user = userEvent.setup();
    renderRoute(<ContactPage />);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText(/please enter at least 2 characters/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^email/i })).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows the API success state and clears the form", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ ok: true, message: "Thanks. Your message was sent to Marc successfully." }), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      })
    );
    renderRoute(<ContactPage />);
    const user = await completeValidForm();
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/message was sent to marc successfully/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^name/i })).toHaveValue("");
  });

  it("shows a safe failure state without losing the form values", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ error: "The message service is temporarily unavailable. Please use email instead." }), {
        status: 503,
        headers: { "Content-Type": "application/json" }
      })
    );
    renderRoute(<ContactPage />);
    const user = await completeValidForm();
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/temporarily unavailable/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^name/i })).toHaveValue("Hiring Manager");
  });
});
