import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";
import { teams, tournaments } from "./data";
import { playerProfiles } from "./data/players";

afterEach(cleanup);

describe("CORE Esports navigation and workflows", () => {
  it("navigates between the main sections using the primary navigation", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      within(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).getByRole("link", { name: "Tournaments" }),
    );
    expect(
      screen.getByRole("heading", { name: "Tournaments", level: 1 }),
    ).toBeInTheDocument();

    await user.click(
      within(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).getByRole("link", { name: "Teams" }),
    );
    expect(
      screen.getByRole("heading", { name: "Teams", level: 1 }),
    ).toBeInTheDocument();

    await user.click(
      within(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).getByRole("link", { name: "Rankings" }),
    );
    expect(
      screen.getByRole("heading", { name: "Rankings", level: 1 }),
    ).toBeInTheDocument();
  });

  it("filters tournament cards by live, upcoming, and completed status using the dataset", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      within(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).getByRole("link", { name: "Tournaments" }),
    );

    const countCards = () =>
      document.querySelectorAll(".page-tournament-grid .tournament-card")
        .length;
    expect(countCards()).toBe(tournaments.length);

    for (const status of ["Live now", "Upcoming", "Completed"] as const) {
      await user.click(screen.getByRole("button", { name: status }));
      expect(countCards()).toBe(
        tournaments.filter((item) => item.status === status).length,
      );
    }
  });

  it("shows search matches and an explicit empty state", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(
      screen.getByRole("textbox", { name: "Search CORE Esports" }),
      "GodLike",
    );
    expect(await screen.findByText("GodLike Esports")).toBeInTheDocument();

    const searchInputs = screen.getAllByRole("textbox", { name: /search/i });
    await user.clear(searchInputs.at(-1)!);
    await user.type(searchInputs.at(-1)!, "no-such-core-result-9071");
    expect(await screen.findByText("No results found")).toBeInTheDocument();
  });

  it("saves a favorite, reloads it from local storage, and removes it", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await user.click(
      within(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).getByRole("link", { name: "Tournaments" }),
    );
    const cegcLink = screen.getByRole("link", {
      name: /Chennai Esports Global Championship 2026/,
    });
    const card = cegcLink.closest(".tournament-card");
    expect(card).not.toBeNull();
    await user.click(
      within(card as HTMLElement).getByRole("button", { name: "Add favorite" }),
    );
    expect(window.localStorage.getItem("core-favorites")).toContain(
      "cegc-2026",
    );

    unmount();
    window.history.replaceState({}, "", "/favorites");
    render(<App />);
    expect(
      screen.getByRole("link", {
        name: /Chennai Esports Global Championship 2026/,
      }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Remove favorite" }));
    expect(await screen.findByText("No favorites yet")).toBeInTheDocument();
  });

  it("rejects incomplete live pick’ems and persists a complete set of picks", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await user.click(
      within(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).getByRole("link", { name: /Pick'ems/i }),
    );
    await user.click(screen.getByRole("button", { name: "Lock in picks" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Choose a team for every question",
    );

    for (const question of document.querySelectorAll(".pickem-question")) {
      await user.click(
        within(question as HTMLElement).getAllByRole("button")[0],
      );
    }
    await user.click(screen.getByRole("button", { name: "Lock in picks" }));
    expect(await screen.findByRole("status")).toHaveTextContent(
      "saved on this device",
    );
    expect(window.localStorage.getItem("core-live-pickems-v1")).toBeTruthy();

    unmount();
    window.history.replaceState({}, "", "/pickems");
    render(<App />);
    expect(
      await screen.findByText("Your predictions are locked in on this device."),
    ).toBeInTheDocument();
  });

  it("changes calendar month and filters the selected date", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      within(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).getByRole("link", { name: "Calendar" }),
    );
    expect(
      screen.getByRole("heading", { name: "November 2026" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(
      screen.getByRole("heading", { name: "December 2026" }),
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "December 11, scheduled events" }),
    );
    expect(
      screen.getByRole("heading", { name: "Events on December 11" }),
    ).toBeInTheDocument();
  });

  it("opens mobile More navigation and follows a destination", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "More" }));
    await user.click(
      within(
        document.querySelector("#mobile-more-menu") as HTMLElement,
      ).getByRole("link", { name: "Favorites" }),
    );
    expect(
      screen.getByRole("heading", { name: "Favorites", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "More" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("renders the custom not-found page for an unknown path", () => {
    window.history.replaceState({}, "", "/not-a-real-core-route");
    render(<App />);
    expect(
      screen.getByRole("heading", {
        name: "We can’t find that page",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("resolves every tournament detail route from the dataset", () => {
    for (const tournament of tournaments) {
      window.history.replaceState({}, "", `/tournaments/${tournament.id}`);
      const { unmount } = render(<App />);
      expect(
        screen.getByRole("heading", { name: tournament.name, level: 1 }),
      ).toBeInTheDocument();
      unmount();
    }
  });
});

describe("mock data integrity", () => {
  it("has unique tournament, team, and player route identifiers", () => {
    for (const [label, ids] of [
      ["tournament", tournaments.map((item) => item.id)],
      ["team", teams.map((item) => item.id)],
      ["player", playerProfiles.map((item) => item.id)],
    ] as const) {
      expect(new Set(ids).size, `duplicate ${label} IDs`).toBe(ids.length);
    }
  });

  it("does not repeat teams in any published tournament podium", () => {
    for (const tournament of tournaments) {
      const podium = [
        tournament.winner,
        tournament.runnerUp,
        tournament.thirdPlace,
      ].filter((team): team is string => Boolean(team));
      expect(
        new Set(podium).size,
        `${tournament.id} has a repeated podium team`,
      ).toBe(podium.length);
    }
  });
});
