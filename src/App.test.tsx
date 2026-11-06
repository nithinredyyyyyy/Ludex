import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";
import {
  cegcGroupAStandings,
  cegcGroupBStandings,
  teams,
  tournaments,
} from "./data";
import { playerProfiles } from "./data/players";
import { getSitemapPaths, sitemapRouteExists } from "./sitemap";

afterEach(cleanup);

describe("CORE Esports navigation and workflows", () => {
  it("supports Ctrl/Cmd+K on desktop while leaving other fields alone", async () => {
    render(<App />);
    const otherInput = document.createElement("input");
    document.body.append(otherInput);
    otherInput.focus();
    otherInput.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(window.location.pathname).toBe("/");

    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(window.location.pathname).toBe("/search");
    expect(
      screen.getByRole("textbox", { name: "Search CORE Esports" }),
    ).toHaveFocus();
    otherInput.remove();
  });

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

  it("resolves every tournament detail route from the dataset", async () => {
    for (const tournament of tournaments) {
      window.history.replaceState({}, "", `/tournaments/${tournament.id}`);
      const { unmount } = render(<App />);
      expect(
        await screen.findByRole("heading", { name: tournament.name, level: 1 }),
      ).toBeInTheDocument();
      unmount();
    }
  });
});

describe("mock data integrity", () => {
  it("keeps the verified CEGC snapshot timestamp and standings data explicit", () => {
    const cegc = tournaments.find((item) => item.id === "cegc-2026");
    expect(cegc?.asOf).toContain("Nov 6, 2026, 4:00:10 PM IST");
    expect(cegc?.matches).toBe(27);
    expect(cegcGroupAStandings).toHaveLength(16);
    expect(cegcGroupBStandings).toHaveLength(16);
    const rows = (items: typeof cegcGroupAStandings) =>
      items.map(
        ({ rank, name, points, wins, placementPoints, eliminations }) =>
          [rank, name, points, wins, placementPoints, eliminations] as const,
      );
    expect(rows(cegcGroupAStandings)).toEqual([
      [1, "Team Tamilas", 133, 1, 47, 86],
      [2, "Myth Official", 121, 2, 42, 79],
      [3, "Unsigned Esports", 120, 0, 38, 82],
      [4, "Raven Esports", 119, 1, 52, 67],
      [5, "Epigrotive Gaming", 113, 2, 46, 67],
      [6, "Team Apex Gaming", 110, 2, 39, 71],
      [7, "RSPT Official", 104, 3, 52, 52],
      [8, "HiggBoson Esports", 93, 1, 38, 55],
      [9, "K9 Esports", 92, 1, 26, 66],
      [10, "Gladiators Esports", 91, 1, 27, 64],
      [11, "iQOO 8Bit", 86, 1, 21, 65],
      [12, "VR1 Esports", 79, 1, 20, 59],
      [13, "Vasista Esports", 78, 0, 20, 58],
      [14, "4TR Official", 69, 0, 23, 46],
      [15, "Lastade Esports", 64, 0, 19, 45],
      [16, "MadKings", 28, 0, 2, 26],
    ]);
    expect(rows(cegcGroupBStandings)).toEqual([
      [1, "Team Outrage", 113, 2, 44, 69],
      [2, "Nebula Esports", 107, 1, 28, 79],
      [3, "GodLike Esports", 101, 2, 48, 53],
      [4, "iQOO Revenant XSpark", 98, 1, 35, 63],
      [5, "GoSolo Rapid Chaos", 76, 1, 28, 48],
      [6, "iQOO Orangutan", 75, 0, 14, 61],
      [7, "Blue Army", 74, 2, 30, 44],
      [8, "Team AX", 69, 0, 29, 40],
      [9, "Wyld Fangs", 66, 0, 24, 42],
      [10, "Genesis Esports", 58, 1, 22, 36],
      [11, "Santa Esports Titans", 57, 1, 22, 35],
      [12, "Blitz Esports", 56, 0, 16, 40],
      [13, "Thunder Hawks", 55, 0, 13, 42],
      [14, "Mysterious4 Esports", 55, 0, 12, 43],
      [15, "Welt Esports", 41, 1, 14, 27],
      [16, "Meta Ninza", 36, 0, 5, 31],
    ]);
  });

  it("includes only routes backed by app data in the sitemap input", () => {
    const paths = getSitemapPaths();
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.every(sitemapRouteExists)).toBe(true);
  });
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
