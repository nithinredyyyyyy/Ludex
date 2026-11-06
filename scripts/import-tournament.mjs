/* global process, console, URL */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: npm run data:import -- <tournament.json>");
  process.exit(1);
}

const input = JSON.parse(await readFile(resolve(inputPath), "utf8"));
const requiredTournamentFields = [
  "id",
  "name",
  "game",
  "date",
  "location",
  "prize",
  "status",
  "color",
  "sourceUrl",
  "sourceLabel",
  "description",
  "mark",
  "organizer",
  "format",
  "formatDetail",
  "broadcast",
];
const missing = requiredTournamentFields.filter(
  (field) =>
    typeof input.tournament?.[field] !== "string" ||
    !input.tournament[field].trim(),
);
if (missing.length) {
  throw new Error(`Missing required tournament fields: ${missing.join(", ")}`);
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.tournament.id)) {
  throw new Error(
    "Tournament id must be a lowercase URL slug, e.g. cegc-2027.",
  );
}
if (!["Live now", "Upcoming", "Completed"].includes(input.tournament.status)) {
  throw new Error('status must be "Live now", "Upcoming", or "Completed".');
}
try {
  new URL(input.tournament.sourceUrl);
} catch {
  throw new Error("sourceUrl must be a complete http(s) URL.");
}
for (const field of ["standings", "prizes", "participants"]) {
  if (input[field] !== undefined && !Array.isArray(input[field])) {
    throw new Error(`${field} must be an array when provided.`);
  }
}
if (input.standings?.some((row) => !Number.isInteger(row.rank) || !row.name)) {
  throw new Error("Every standing needs an integer rank and team name.");
}
if (input.participants?.some((team) => !team.name)) {
  throw new Error("Every participant needs a team name.");
}
if (input.rosters && typeof input.rosters !== "object") {
  throw new Error("rosters must map team names to roster objects.");
}
for (const [teamName, roster] of Object.entries(input.rosters ?? {})) {
  if (
    !teamName.trim() ||
    !Array.isArray(roster.players) ||
    roster.players.length === 0
  ) {
    throw new Error(
      `Roster for ${teamName || "(unnamed team)"} needs players.`,
    );
  }
}

const target = resolve("src/data/tournament-updates.json");
const updates = JSON.parse(await readFile(target, "utf8"));
const existingIndex = updates.findIndex(
  (record) => record.tournament.id === input.tournament.id,
);
if (existingIndex >= 0) {
  const previous = updates[existingIndex];
  updates[existingIndex] = {
    ...previous,
    ...input,
    tournament: { ...previous.tournament, ...input.tournament },
    standings: input.standings ?? previous.standings,
    prizes: input.prizes ?? previous.prizes,
    participants: input.participants ?? previous.participants,
    rosters: input.rosters ?? previous.rosters,
  };
} else updates.push(input);
await writeFile(target, `${JSON.stringify(updates, null, 2)}\n`);
console.log(
  `${existingIndex >= 0 ? "Updated" : "Added"} ${input.tournament.name} (${input.tournament.id}) in ${target}`,
);
