import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Heart,
  MapPin,
  Search,
  Trophy,
} from "lucide-react";
import { teams, type Tournament } from "../data";
import {
  bgisAwards,
  bgisFinalResults,
  bgisFmvpRankings,
  bgisIglRankings,
  bgisOverview,
  bgisParticipants,
  bgisPlacementPoints,
  bgisPrizePlaces,
  bgisSemiFinalGroups,
  bgisSemiFinalResults,
  bgisStages,
  bgisSurvivalResults,
} from "../data/bgis2026";
import "../styles/bgis-detail.css";

type Props = { item: Tournament; favorite: boolean; onFavorite: () => void };
const inr = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card bgis-section" id={id}>
      <header className="bgis-section-head">
        {eyebrow && <small>{eyebrow}</small>}
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
}

function TeamMark({ name }: { name: string }) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const known = teams.find((team) => {
    const key = team.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    return normalized.includes(key) || key.includes(normalized);
  });
  const [failed, setFailed] = useState(false);
  return (
    <span className="bgis-team-mark">
      {known?.logoUrl && !failed ? (
        <img
          src={known.logoUrl}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        name
          .split(/\s+/)
          .map((part) => part[0])
          .join("")
          .slice(0, 3)
      )}
    </span>
  );
}

function Standings({
  title,
  rows,
  note,
}: {
  title: string;
  rows: typeof bgisSemiFinalResults;
  note: string;
}) {
  return (
    <details className="bgis-result-block">
      <summary>
        <span>
          <b>{title}</b>
          <small>
            {rows.length} teams · {rows[0]?.team} leads with {rows[0]?.points}{" "}
            pts
          </small>
        </span>
        <ChevronDown size={17} />
      </summary>
      <div className="bgis-result-content">
        <p>{note}</p>
        <div className="bgis-table">
          <div className="bgis-table-row bgis-table-head">
            <span>RANK</span>
            <span>TEAM</span>
            <span>POINTS</span>
          </div>
          {rows.map((row) => (
            <div
              className={`bgis-table-row${row.rank === 1 ? " bgis-winner-row" : ""}`}
              key={`${title}-${row.rank}`}
            >
              <span>{String(row.rank).padStart(2, "0")}</span>
              <b>{row.team}</b>
              <strong>{row.points}</strong>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}

export default function BGIS2026Detail({ item, favorite, onFavorite }: Props) {
  const [rosterFilter, setRosterFilter] = useState<
    "All" | "Quarter Finals" | "Wildcard"
  >("All");
  const [rosterSearch, setRosterSearch] = useState("");
  const participants = useMemo(
    () =>
      bgisParticipants.filter(
        (team) =>
          (rosterFilter === "All" || team.stage === rosterFilter) &&
          `${team.name} ${team.roster.join(" ")}`
            .toLowerCase()
            .includes(rosterSearch.toLowerCase()),
      ),
    [rosterFilter, rosterSearch],
  );
  const pageNav = [
    ["about", "About"],
    ["format", "Format"],
    ["schedule", "Tournament schedule"],
    ["prize-pool", "Prize pool"],
    ["participants", "Participants"],
    ["results", "Results"],
    ["statistics", "Statistics"],
  ];

  return (
    <div className="page-content bgis-page">
      <Link to="/tournaments" className="back-link">
        <ArrowLeft size={15} />
        All tournaments
      </Link>
      <header className="card bgis-hero">
        <div className="bgis-logo">
          {item.logoUrl ? (
            <img
              src={item.logoUrl}
              alt="BGIS 2026 tournament logo"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <b>BGIS</b>
          )}
        </div>
        <div className="bgis-hero-copy">
          <span className="bgis-kicker">
            BATTLEGROUNDS MOBILE INDIA · A-TIER
          </span>
          <h1>{item.name}</h1>
          <p>“{bgisOverview.tagline}” · Fifth edition</p>
          <div className="bgis-hero-meta">
            <span>
              <CalendarDays size={15} />
              {bgisOverview.dates}
            </span>
            <span>
              <MapPin size={15} />
              {bgisOverview.locations}
            </span>
          </div>
        </div>
        <button
          className={`button ${favorite ? "button-primary" : "button-secondary"} bgis-save`}
          onClick={onFavorite}
        >
          <Heart size={16} fill={favorite ? "currentColor" : "none"} />
          {favorite ? "Saved" : "Save event"}
        </button>
      </header>
      <div className="bgis-layout">
        <div className="bgis-main">
          <Section id="about" title="About" eyebrow="TOURNAMENT OVERVIEW">
            <p className="bgis-lead">{bgisOverview.summary}</p>
            <div className="bgis-info-grid">
              {[
                ["Series", bgisOverview.series],
                ["Organizer", bgisOverview.organizer],
                ["Official device", bgisOverview.device],
                ["Game version", bgisOverview.game],
                ["Game mode", bgisOverview.mode],
                ["Type", bgisOverview.type],
                ["Location", bgisOverview.locations],
                ["Venue", bgisOverview.venues],
                ["Prize pool", bgisOverview.prize],
                ["Start date", "Mar 12, 2026"],
                ["End date", "Mar 29, 2026"],
                ["Teams", `${bgisOverview.teams}`],
              ].map(([label, value]) => (
                <div className="bgis-info-item" key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </div>
              ))}
            </div>
          </Section>

          <Section id="format" title="Format" eyebrow="COMPETITION STRUCTURE">
            <div className="bgis-league-banner">
              <b>League Stage</b>
              <span>Jan 26 – Mar 8, 2026 · Online</span>
              <small>
                Rounds 1–4, Quarter Finals and Wildcard determine qualification
                for Semi Finals.
              </small>
            </div>
            <div className="bgis-stage-list">
              {bgisStages.map((stage, index) => (
                <details
                  className="bgis-stage"
                  key={stage.name}
                  open={index === 0}
                >
                  <summary>
                    <span className="bgis-stage-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="bgis-stage-title">
                      <b>{stage.name}</b>
                      <small>
                        {stage.dates}, 2026 · {stage.venue}
                      </small>
                    </span>
                    <ChevronDown size={16} />
                  </summary>
                  <p>{stage.details}</p>
                </details>
              ))}
            </div>
            <h3 className="bgis-subhead">Match scoring</h3>
            <p className="bgis-note">
              Placement points per match. Teams earn one additional point per
              elimination.
            </p>
            <div className="bgis-points-grid">
              {bgisPlacementPoints.map(([place, points]) => (
                <div key={place}>
                  <span>{place}</span>
                  <b>{points} pts</b>
                </div>
              ))}
            </div>
            <h3 className="bgis-subhead">Tiebreaker order</h3>
            <ol className="bgis-tiebreakers">
              <li>Total WWCDs across all matches</li>
              <li>Total placement points across all matches</li>
              <li>Total elimination points across all matches</li>
              <li>Best placement in the most recent match</li>
            </ol>
          </Section>

          <Section
            id="schedule"
            title="Tournament schedule"
            eyebrow="2026 SEASON CALENDAR"
          >
            <div className="bgis-timeline">
              {bgisStages.map((stage, index) => (
                <article className="bgis-timeline-row" key={stage.name}>
                  <span className="bgis-timeline-date">
                    {stage.dates}
                    <small>2026</small>
                  </span>
                  <span className="bgis-timeline-marker">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="bgis-timeline-copy">
                    <b>{stage.name}</b>
                    <small>{stage.venue}</small>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="prize-pool"
            title="Prize pool"
            eyebrow="₹4 CRORE TOTAL PURSE"
          >
            <div className="bgis-prize-total">
              <Trophy size={20} />
              <span>
                <small>TOTAL PRIZE POOL</small>
                <b>{bgisOverview.prize} INR</b>
              </span>
              <span className="bgis-prize-usd">≈ $422,019 USD</span>
            </div>
            <details className="bgis-data-dropdown">
              <summary>
                <span>
                  <b>Base prize distribution</b>
                  <small>
                    24 placements · 1st place {inr(bgisPrizePlaces[0][1])}
                  </small>
                </span>
                <ChevronDown size={17} />
              </summary>
              <div className="bgis-table bgis-prize-table">
                <div className="bgis-table-row bgis-table-head">
                  <span>PLACE</span>
                  <span>PARTICIPANT</span>
                  <span>PRIZE</span>
                </div>
                {bgisPrizePlaces.map(([team, amount], index) => (
                  <div className="bgis-table-row" key={team}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <b>{team}</b>
                    <strong>{inr(amount)}</strong>
                  </div>
                ))}
              </div>
            </details>
            <details className="bgis-data-dropdown">
              <summary>
                <span>
                  <b>Individual and fan awards</b>
                  <small>{bgisAwards.length} awards</small>
                </span>
                <ChevronDown size={17} />
              </summary>
              <div className="bgis-table bgis-awards-table">
                <div className="bgis-table-row bgis-table-head">
                  <span>AWARD</span>
                  <span>RECIPIENT</span>
                  <span>PRIZE</span>
                </div>
                {bgisAwards.map(([award, player, team, amount]) => (
                  <div className="bgis-table-row" key={award}>
                    <span>{award}</span>
                    <b>
                      {player}
                      {award === "Fan Favorite Team" ? "" : ` · ${team}`}
                    </b>
                    <strong>{inr(amount)}</strong>
                  </div>
                ))}
              </div>
            </details>
          </Section>

          <Section
            id="participants"
            title="Participants"
            eyebrow="24 TEAMS · QUARTER FINALS & WILDCARD"
          >
            <div className="bgis-roster-tools">
              <label>
                <Search size={16} />
                <input
                  value={rosterSearch}
                  onChange={(event) => setRosterSearch(event.target.value)}
                  placeholder="Search teams or players"
                />
              </label>
              <div className="bgis-roster-filters">
                {(["All", "Quarter Finals", "Wildcard"] as const).map(
                  (filter) => (
                    <button
                      key={filter}
                      className={rosterFilter === filter ? "selected" : ""}
                      onClick={() => setRosterFilter(filter)}
                    >
                      {filter}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="bgis-roster-grid">
              {participants.map((team) => {
                const seed =
                  bgisParticipants
                    .filter((entry) => entry.stage === team.stage)
                    .findIndex((entry) => entry.name === team.name) + 1;
                return (
                  <details className="bgis-roster-card" key={team.name}>
                    <summary className="bgis-roster-head">
                      <TeamMark name={team.name} />
                      <span className="bgis-roster-label">
                        <b>{team.name}</b>
                        <small>
                          {team.stage} ·{" "}
                          {
                            team.roster.filter(
                              (player) => !/coach|analyst|dnp/i.test(player),
                            ).length
                          }{" "}
                          players
                        </small>
                      </span>
                      <span className="bgis-seed">
                        {String(seed).padStart(2, "0")}
                      </span>
                      <ChevronDown size={15} />
                    </summary>
                    <ul>
                      {team.roster.map((player) => (
                        <li key={player}>{player}</li>
                      ))}
                    </ul>
                  </details>
                );
              })}
            </div>
            <div className="bgis-transfer-note">
              <b>Roster transfer window</b>
              <span>
                Oct 12, 2025 – Jan 25, 2026 · Transfers following BMSD 2025
              </span>
            </div>
          </Section>

          <Section id="results" title="Results" eyebrow="STAGE STANDINGS">
            <Standings
              title="Semi Finals"
              rows={bgisSemiFinalResults}
              note="24 teams · Mar 12–15 · 24 matches across three groups. Top eight advanced to Grand Finals; teams ranked 9–24 entered the Survival Stage."
            />
            <details className="bgis-data-dropdown bgis-groups">
              <summary>
                <span>
                  <b>Semi Finals · Group draw</b>
                  <small>Three groups · eight teams each</small>
                </span>
                <ChevronDown size={17} />
              </summary>
              <div>
                {Object.entries(bgisSemiFinalGroups).map(([group, names]) => (
                  <article key={group}>
                    <b>Group {group}</b>
                    <ul>
                      {names.map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </details>
            <Standings
              title="Survival Stage"
              rows={bgisSurvivalResults}
              note="16 teams · Mar 16–17 · 12 matches. The top eight qualified for Grand Finals."
            />
            <Standings
              title="Grand Finals"
              rows={bgisFinalResults}
              note="16 teams · Mar 27–29 · 18 matches. Team SouL won the title with 173 points."
            />
          </Section>

          <Section
            id="statistics"
            title="Statistics & awards"
            eyebrow="MVP · FINALS MVP · BEST IGL"
          >
            <div className="bgis-table bgis-stat-table">
              <div className="bgis-table-row bgis-table-head">
                <span>RANK</span>
                <span>PLAYER · TEAM</span>
                <span>RATING</span>
              </div>
              {[
                [
                  "1",
                  "HunterZ · Genesis Esports",
                  "1.61",
                  "94 finishes · 17,382 damage · 21:39 avg. survival · 75 knocks",
                ],
                [
                  "2",
                  "LEGIT · Team SouL",
                  "1.57",
                  "86 finishes · 18,006 damage · 21:30 avg. survival · 82 knocks",
                ],
                [
                  "3",
                  "Jokerr · Team SouL",
                  "1.49",
                  "76 finishes · 17,875 damage · 21:56 avg. survival · 86 knocks",
                ],
                [
                  "4",
                  "Goblin · Team SouL",
                  "1.42",
                  "76 finishes · 15,825 damage · 20:51 avg. survival · 84 knocks",
                ],
                [
                  "5",
                  "AKop · Orangutan",
                  "1.36",
                  "73 finishes · 15,701 damage · 20:56 avg. survival · 72 knocks",
                ],
              ].map(([rank, player, rating, detail]) => (
                <div className="bgis-stat-row" key={player}>
                  <span>{rank}</span>
                  <b>{player}</b>
                  <strong>{rating}</strong>
                  <small>{detail}</small>
                </div>
              ))}
            </div>
            <p className="bgis-note bgis-formula">
              MVP rating weights finishes (40%), damage (30%), average survival
              time (20%) and knockouts (10%) relative to the tournament totals.
            </p>
            <details className="bgis-data-dropdown">
              <summary>
                <span>
                  <b>Grand Finals MVP rankings</b>
                  <small>
                    {bgisFmvpRankings[0].player} leads with a{" "}
                    {bgisFmvpRankings[0].rating} rating
                  </small>
                </span>
                <ChevronDown size={17} />
              </summary>
              <div className="bgis-player-rankings">
                {bgisFmvpRankings.map((row) => (
                  <article key={row.player}>
                    <span>{String(row.rank).padStart(2, "0")}</span>
                    <b>{row.player}</b>
                    <strong>{row.rating}</strong>
                    <small>
                      {row.finishes} finishes · {row.damage} damage ·{" "}
                      {row.survival} avg. survival · {row.knocks} knocks
                    </small>
                  </article>
                ))}
              </div>
            </details>
            <details className="bgis-data-dropdown">
              <summary>
                <span>
                  <b>Best IGL rankings</b>
                  <small>
                    {bgisIglRankings[0].player} leads with a{" "}
                    {bgisIglRankings[0].rating} rating
                  </small>
                </span>
                <ChevronDown size={17} />
              </summary>
              <div className="bgis-player-rankings">
                {bgisIglRankings.map((row) => (
                  <article key={row.player}>
                    <span>{String(row.rank).padStart(2, "0")}</span>
                    <b>{row.player}</b>
                    <strong>{row.rating}</strong>
                    <small>
                      {row.avgPoints} avg. points · {row.wwcd} WWCD · {row.top5}{" "}
                      top fives · {row.survival} team survival
                    </small>
                  </article>
                ))}
              </div>
            </details>
            <h3 className="bgis-subhead">Tournament awards</h3>
            <ul className="bgis-award-list">
              {bgisAwards.map(([award, player, team]) => (
                <li key={award}>
                  <b>{award}</b>
                  <span>
                    {player} · {team}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
        <aside className="card bgis-toc">
          <small>ON THIS PAGE</small>
          <nav>
            {pageNav.map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
                <ChevronRight size={13} />
              </a>
            ))}
          </nav>
          <div className="bgis-toc-note">
            <small>CHAMPIONS</small>
            <b>Team SouL</b>
            <span>173 points · Grand Finals MVP: LEGIT</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
