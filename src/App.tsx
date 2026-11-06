import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Compass,
  Crown,
  Gamepad2,
  Heart,
  Home,
  Menu,
  Newspaper,
  Search,
  Sparkles,
  Trophy,
  Users,
  X,
  Target,
} from "lucide-react";
import {
  articles,
  cegcGroupAStandings,
  cegcGroupBStandings,
  dataCheckedAt,
  events,
  rankingUpdatedAt,
  teams,
  tournaments,
  tournamentParticipants,
  tournamentPrizes,
  tournamentRosters,
  tournamentStandings,
  type Article,
  type Event,
  type Team,
  type Tournament,
  type TournamentParticipant,
  type TournamentStanding,
} from "./data";
import "./styles/tournament-participants.css";
import "./styles/tournament-detail.css";
import type { PlayerProfileRecord } from "./data/players";
import { kieRankingsSnapshot } from "./data/rankings-summary";
import "./styles.css";
import "./styles/profiles.css";
import "./styles/pickems.css";
import "./styles/layout-fixes.css";
import {
  clearPickemEvent,
  getPickemState,
  savePickemState,
} from "./pickems-storage";
import { canonicalBaseUrl } from "./seo-config";

const BGIS2026Detail = lazy(() => import("./components/BGIS2026Detail"));

function usePlayerProfiles() {
  const [profiles, setProfiles] = useState<PlayerProfileRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let active = true;
    void import("./data/players").then(({ playerProfiles }) => {
      if (!active) return;
      setProfiles(playerProfiles);
      setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, []);
  return { profiles, loaded };
}

const nav = [
  { label: "Home", to: "/", icon: Home },
  { label: "Tournaments", to: "/tournaments", icon: Trophy },
  { label: "Teams", to: "/teams", icon: Users },
  { label: "Rankings", to: "/rankings", icon: Activity },
  { label: "Pick'ems", to: "/pickems", icon: Target },
  { label: "News", to: "/news", icon: Newspaper },
  { label: "Calendar", to: "/calendar", icon: CalendarDays },
];
const archiveSeriesFullNames: Record<string, string> = {
  PMWC: "PUBG Mobile World Cup",
  PMGC: "PUBG Mobile Global Championship",
  BGIS: "Battlegrounds Mobile India Series",
  CEGC: "Chennai Esports Global Championship",
  BMPS: "Battlegrounds Mobile India Pro Series",
  BMSD: "Battlegrounds Mobile India Showdown",
  BMIC: "Battlegrounds Mobile India International Cup",
  BGMS: "Battlegrounds Mobile India Masters Series",
  "IN-KR": "India – Korea Invitational",
};

function Brand() {
  return (
    <Link className="brand" to="/">
      <span className="brand-mark">
        <ArrowUpRight size={23} strokeWidth={3} />
      </span>
      <span>
        <b>CORE</b>
        <small>ESPORTS</small>
      </span>
    </Link>
  );
}

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    error?: boolean;
  } | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem("core-favorites") ?? "[]",
      );
      return Array.isArray(saved)
        ? saved.filter((item): item is string => typeof item === "string")
        : [];
    } catch {
      return [];
    }
  });
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;
    if (isTouch) return;
    const handleShortcut = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k")
        return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target !== searchInputRef.current &&
        (target.isContentEditable ||
          /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
      )
        return;
      event.preventDefault();
      navigate("/search");
      searchInputRef.current?.focus();
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [navigate]);
  useEffect(() => {
    const path = location.pathname;
    const detailId = decodeURIComponent(path.split("/")[2] ?? "");
    const tournamentPage = path.startsWith("/tournaments/")
      ? tournaments.find((entry) => entry.id === detailId)
      : undefined;
    const teamPage = path.startsWith("/teams/")
      ? teams.find((entry) => entry.id === detailId)
      : undefined;
    const articlePage = path.startsWith("/news/")
      ? articles.find((entry) => entry.id === detailId)
      : undefined;
    const titles: Record<string, string> = {
      "/": "Home",
      "/tournaments": "Tournaments",
      "/teams": "Teams",
      "/rankings": "Rankings",
      "/news": "News",
      "/calendar": "Event Calendar",
      "/search": "Search",
      "/favorites": "Favorites",
      "/pickems": "Pick'ems",
    };
    const section =
      tournamentPage?.name ??
      (path.startsWith("/tournaments/")
        ? "Tournament"
        : teamPage
          ? `${teamPage.name} profile`
          : path.startsWith("/teams/")
            ? "Team profile"
            : path.startsWith("/players/")
              ? `${detailId.replaceAll("-", " ")} profile`
              : (articlePage?.title ??
                (path.startsWith("/news/") ? "Story" : titles[path])));
    const title = section ?? "Page not found";
    const pageTitle = `${title} | CORE Esports`;
    document.title = pageTitle;
    const descriptions: Record<string, string> = {
      "/": "Follow the latest BGMI esports tournaments, teams, rankings and news with CORE Esports.",
      "/tournaments":
        "Browse live, upcoming and completed BGMI tournaments, with schedules, formats and standings.",
      "/teams":
        "Explore BGMI esports teams, active rosters, rankings and achievements.",
      "/rankings":
        "Review KIE team and player rankings, points, movement and event activity.",
      "/news": "Read esports news and coverage from the CORE Esports desk.",
      "/calendar":
        "See the CORE Esports tournament calendar and scheduled match events.",
      "/search": "Search CORE Esports tournaments, teams, players and news.",
      "/favorites": "Your saved CORE Esports tournaments, teams and stories.",
      "/pickems": "Make picks for currently live CORE Esports tournaments.",
    };
    const pageDescription =
      tournamentPage?.description ??
      (teamPage
        ? `${teamPage.name} team profile, current KIE ranking, tournament placements, registered lineups and player profiles.`
        : (articlePage?.summary ??
          descriptions[path] ??
          `Explore CORE Esports ${title.toLowerCase()}, tournament schedules, teams, rankings and stories.`));
    const absoluteUrl = `${canonicalBaseUrl}${path}`;
    const setMeta = (selector: string, attribute: string, value: string) => {
      const meta = document.querySelector<HTMLMetaElement>(selector);
      if (meta) meta.setAttribute(attribute, value);
    };
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical) canonical.href = absoluteUrl;
    setMeta('meta[name="description"]', "content", pageDescription);
    setMeta('meta[property="og:title"]', "content", pageTitle);
    setMeta('meta[property="og:description"]', "content", pageDescription);
    setMeta('meta[property="og:url"]', "content", absoluteUrl);
    setMeta(
      'meta[property="og:type"]',
      "content",
      articlePage ? "article" : "website",
    );
    setMeta('meta[name="twitter:title"]', "content", pageTitle);
    setMeta('meta[name="twitter:description"]', "content", pageDescription);
    const notFound =
      !section ||
      (path.startsWith("/tournaments/") && !tournamentPage) ||
      (path.startsWith("/teams/") && !teamPage) ||
      (path.startsWith("/news/") && !articlePage);
    const robots = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (notFound) {
      const robotsTag = robots ?? document.createElement("meta");
      robotsTag.name = "robots";
      robotsTag.content = "noindex";
      if (!robots) document.head.append(robotsTag);
    } else {
      robots?.remove();
    }
    document.querySelector("script[data-route-jsonld]")?.remove();
    if (articlePage && Number.isFinite(Date.parse(articlePage.date))) {
      const jsonLd = document.createElement("script");
      jsonLd.type = "application/ld+json";
      jsonLd.dataset.routeJsonld = "true";
      jsonLd.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: articlePage.title,
        datePublished: new Date(articlePage.date).toISOString(),
        mainEntityOfPage: absoluteUrl,
        description: articlePage.summary,
        publisher: { "@type": "Organization", name: "CORE Esports" },
      });
      document.head.append(jsonLd);
    }
    if (path.startsWith("/players/")) {
      void import("./data/players").then(({ playerProfiles }) => {
        if (location.pathname !== path) return;
        const playerPage = playerProfiles.find((entry) =>
          [entry.id, entry.name, ...entry.aliases].some(
            (alias) => playerSlug(alias) === detailId,
          ),
        );
        if (playerPage) {
          const playerTitle = `${playerPage.name} profile | CORE Esports`;
          const playerDescription = `${playerPage.name} player profile with career hitboard statistics, tournament achievements and registered lineups.`;
          document.title = playerTitle;
          setMeta('meta[name="description"]', "content", playerDescription);
          setMeta('meta[property="og:title"]', "content", playerTitle);
          setMeta(
            'meta[property="og:description"]',
            "content",
            playerDescription,
          );
          setMeta('meta[name="twitter:title"]', "content", playerTitle);
          setMeta(
            'meta[name="twitter:description"]',
            "content",
            playerDescription,
          );
          robots?.remove();
        } else {
          const robotsTag = robots ?? document.createElement("meta");
          robotsTag.name = "robots";
          robotsTag.content = "noindex";
          if (!robots) document.head.append(robotsTag);
        }
      });
    }
  }, [location.pathname]);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    setFavorites(next);
    try {
      localStorage.setItem("core-favorites", JSON.stringify(next));
      setToast({
        message: next.includes(id)
          ? "Added to favorites"
          : "Removed from favorites",
      });
    } catch {
      setToast({
        message: "Could not save favorites on this device",
        error: true,
      });
    }
  };
  const runSearch = (value: string) => setQuery(value);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Brand />
        <div className="sidebar-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {nav.map(({ label, to, icon: Icon }) => (
            <NavLink
              end={to === "/"}
              key={to}
              to={to}
              onClick={() => setMoreOpen(false)}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-label secondary-label">YOUR SPACE</div>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          <Heart size={18} strokeWidth={1.8} />
          <span>Favorites</span>
          {favorites.length > 0 && (
            <span className="nav-count">{favorites.length}</span>
          )}
        </NavLink>
        <div className="sidebar-bottom">
          <div className="community-icon">
            <Sparkles size={17} />
          </div>
          <b>CORE COMMUNITY</b>
          <p>Stay close to the game.</p>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div className="mobile-brand">
            <Brand />
          </div>
          <label className="global-search">
            <Search size={17} />
            <input
              ref={searchInputRef}
              value={query}
              onChange={(e) => {
                runSearch(e.target.value);
                navigate("/search");
              }}
              onFocus={() => navigate("/search")}
              placeholder="Search tournaments, teams, news..."
              aria-label="Search CORE Esports"
            />
            {query && (
              <button aria-label="Clear search" onClick={() => setQuery("")}>
                <X size={15} />
              </button>
            )}
            <kbd>⌘ K</kbd>
          </label>
          <div className="top-actions">
            <div className="profile-avatar" aria-hidden="true">
              CORE
            </div>
            <span className="profile-name">CORE Esports</span>
          </div>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage favorites={favorites} toggleFavorite={toggleFavorite} />
            }
          />
          <Route
            path="/tournaments"
            element={
              <TournamentsPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/tournaments/:id"
            element={
              <TournamentDetail
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/pickems" element={<PickemsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<ArticleDetail />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route
            path="/search"
            element={
              <SearchPage
                query={query}
                onQueryChange={setQuery}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <footer className="app-footer">
          <Link to="/" className="footer-brand">
            CORE Esports
          </Link>
          <nav aria-label="Footer navigation">
            {nav.slice(1).map(({ label, to }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
            <Link to="/favorites">Favorites</Link>
          </nav>
          <span>
            © {new Date().getFullYear()} CORE Esports · Sample data for
            demonstration
          </span>
        </footer>
      </main>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {nav.slice(0, 4).map(({ label, to, icon: Icon }) => (
          <NavLink
            end={to === "/"}
            key={to}
            to={to}
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `mobile-nav-link${isActive ? " active" : ""}`
            }
          >
            <Icon size={20} />
            <span>
              {label === "Tournaments"
                ? "Events"
                : label === "Rankings"
                  ? "Ranks"
                  : label}
            </span>
          </NavLink>
        ))}
        <button
          className={`mobile-nav-link${moreOpen ? " active" : ""}`}
          aria-expanded={moreOpen}
          aria-controls="mobile-more-menu"
          onClick={() => setMoreOpen((open) => !open)}
        >
          <Menu size={20} />
          <span>More</span>
        </button>
        {moreOpen && (
          <>
            <button
              className="mobile-menu-backdrop"
              aria-label="Close menu"
              onClick={() => setMoreOpen(false)}
            />
            <div className="mobile-more-menu" id="mobile-more-menu">
              {[
                { label: "Pick'ems", to: "/pickems", icon: Target },
                { label: "News", to: "/news", icon: Newspaper },
                { label: "Calendar", to: "/calendar", icon: CalendarDays },
                { label: "Search", to: "/search", icon: Search },
                { label: "Favorites", to: "/favorites", icon: Heart },
              ].map(({ label, to, icon: Icon }) => (
                <NavLink key={to} to={to} onClick={() => setMoreOpen(false)}>
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </div>
          </>
        )}
      </nav>
      {toast && (
        <div
          className={`app-toast${toast.error ? " app-toast-error" : ""}`}
          role={toast.error ? "alert" : "status"}
        >
          <CheckCircle2 size={17} />
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} aria-label="Dismiss message">
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </div>
  );
}

function PageLoading() {
  return (
    <div
      className="page-content route-loading"
      role="status"
      aria-live="polite"
    >
      <span className="loading-mark" aria-hidden="true" />
      <b>Loading CORE Esports</b>
      <span>Preparing this page…</span>
    </div>
  );
}
function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <h2>
        <i />
        {title}
      </h2>
      {action}
    </div>
  );
}
function DataNotice() {
  return (
    <div className="data-notice">
      <Sparkles size={14} />
      <span>Season data reviewed {dataCheckedAt}</span>
    </div>
  );
}
function Card({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`card ${className}`}>
      {children}
    </section>
  );
}

function HomePage({
  favorites,
  toggleFavorite,
}: {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}) {
  return (
    <div className="page-content dashboard-page">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">SEASON OVERVIEW</div>
          <h1>Your esports dashboard</h1>
          <p>Follow the tournaments, teams and stories shaping the season.</p>
        </div>
        <Link className="button button-secondary" to="/calendar">
          <CalendarDays size={16} />
          This week
          <ChevronRight size={15} />
        </Link>
      </div>
      <DataNotice />
      <div className="dashboard-grid">
        <div className="dashboard-primary">
          <Card className="hero-card">
            <div className="hero-copy">
              <span className="hero-kicker">
                <span className="live-dot" /> INDIA'S ESPORTS HUB
              </span>
              <h2>
                Where every
                <br />
                match matters.
              </h2>
              <p>
                Your home for tournaments, teams and the stories behind every
                match.
              </p>
              <Link className="button button-primary" to="/tournaments">
                Explore tournaments
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-art">
              <div className="hero-art-circle">
                <Trophy size={47} strokeWidth={1.3} />
              </div>
              <div className="hero-stat">
                <span>BGMI · CEGC 2026</span>
                <b>Live now</b>
                <small>
                  <span className="live-dot" /> Group Stage 1
                </small>
              </div>
            </div>
          </Card>
          <SectionHeading
            title="Live & upcoming"
            action={
              <Link className="text-link" to="/tournaments">
                View all <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="tournament-grid">
            {tournaments
              .filter((item) => item.status !== "Completed")
              .slice(0, 3)
              .map((item) => (
                <TournamentCard
                  key={item.id}
                  item={item}
                  favorite={favorites.includes(item.id)}
                  onFavorite={() => toggleFavorite(item.id)}
                />
              ))}
          </div>
          <SectionHeading
            title="Event calendar"
            action={
              <Link className="text-link" to="/calendar">
                Full calendar <ArrowRight size={14} />
              </Link>
            }
          />
          <EventList items={events.slice(0, 3)} />
        </div>
        <aside className="dashboard-aside">
          <Card className="summary-card">
            <div className="card-topline">
              <span className="card-overline">BGMI DATA SNAPSHOT</span>
              <span className="soft-icon">
                <Activity size={17} />
              </span>
            </div>
            <div className="snapshot-number">
              {kieRankingsSnapshot.teamsTotal} <span>ranked teams</span>
            </div>
            <p className="snapshot-note">KRAFTON India Esports leaderboard</p>
            <div className="snapshot-metrics">
              <div>
                <span>Rankings updated</span>
                <b>{kieRankingsSnapshot.teamDate}</b>
              </div>
              <div>
                <span>Next BGMI event</span>
                <b>Nov 15</b>
              </div>
            </div>
          </Card>
          <Card className="standings-card">
            <SectionHeading
              title="Top KIE standings"
              action={
                <Link
                  className="icon-link"
                  to="/rankings"
                  aria-label="View rankings"
                >
                  <ArrowUpRight size={17} />
                </Link>
              }
            />
            <div className="standings-tabs">
              <span className="tab-active">BGMI · KIE POINTS</span>
              <span className="result-count">Updated {rankingUpdatedAt}</span>
            </div>
            <Standings rows={teams.slice(0, 4)} />
          </Card>
          <Card className="news-card">
            <SectionHeading
              title="Latest news"
              action={
                <Link className="icon-link" to="/news" aria-label="View news">
                  <ArrowUpRight size={17} />
                </Link>
              }
            />
            {articles.slice(0, 2).map((article) => (
              <ArticleRow key={article.id} article={article} />
            ))}
          </Card>
          <div className="tip-card">
            <div className="tip-icon">
              <CircleHelp size={18} />
            </div>
            <div>
              <b>New to CORE?</b>
              <p>Find your team and follow your favorite tournaments.</p>
              <Link to="/teams">
                Explore teams <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PickemsPage() {
  const liveTournaments = tournaments.filter(
    (item) =>
      item.status === "Live now" &&
      (tournamentParticipants[item.id]?.length ?? 0) > 0,
  );
  const [eventId, setEventId] = useState(() => liveTournaments[0]?.id ?? "");
  const [storedState, setStoredState] = useState(getPickemState);
  const { picks, submittedEvents } = storedState;
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const event =
    liveTournaments.find((item) => item.id === eventId) ?? liveTournaments[0];
  const participants = event ? (tournamentParticipants[event.id] ?? []) : [];
  const groupLabels = [
    ...new Set(
      participants
        .map((participant) => participant.route)
        .filter((route): route is string =>
          Boolean(route && /^Group\s/i.test(route)),
        ),
    ),
  ];
  const questions = [
    ...(participants.length > 1
      ? [
          {
            id: "champion",
            title: `Who will win ${event?.name ?? "this tournament"}?`,
            group: "All participants",
            options: participants,
          },
          {
            id: "runner-up",
            title: "Who will finish as runner-up?",
            group: "All participants",
            options: participants,
          },
        ]
      : []),
    ...groupLabels.map((group) => ({
      id: `leader-${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      title: `Which team will lead ${group.split("·")[0].trim()}?`,
      group,
      options: participants.filter(
        (participant) => participant.route === group,
      ),
    })),
  ];
  const eventPicks = event ? (picks[event.id] ?? {}) : {};
  const submitted = event ? submittedEvents.includes(event.id) : false;
  const changeEvent = (nextId: string) => {
    setEventId(nextId);
    setMessage("");
    setError("");
  };
  const savePicks = () => {
    if (Object.keys(eventPicks).length !== questions.length) {
      setError(
        "Choose a team for every question before locking in your picks.",
      );
      setMessage("");
      return;
    }
    if (!event) return;
    const nextPicks = { ...picks, [event.id]: eventPicks };
    const nextSubmitted = [...new Set([...submittedEvents, event.id])];
    try {
      const nextState = { picks: nextPicks, submittedEvents: nextSubmitted };
      savePickemState(nextState);
      setStoredState(nextState);
      setError("");
      setMessage("Your live tournament picks are saved on this device.");
    } catch {
      setError("Could not save picks on this device. Please try again.");
      setMessage("");
    }
  };
  const clearPicks = () => {
    if (!event) return;
    const nextState = clearPickemEvent(storedState, event.id);
    setMessage("");
    setError("");
    try {
      savePickemState(nextState);
      setStoredState(nextState);
    } catch {
      setError(
        "Picks were cleared for this view but could not be updated in storage.",
      );
    }
  };
  if (!event)
    return (
      <div className="page-content">
        <EmptyPage
          title="No live tournament"
          description="Live tournament picks will appear here when an event is marked live and its participants are available."
        />
      </div>
    );
  return (
    <div className="page-content pickems-page">
      <PageHeader
        eyebrow="LIVE TOURNAMENT PREDICTIONS"
        title="Live Pick’ems"
        description="Make your predictions for the tournament that’s live now."
        action={
          <Link
            className="button button-secondary"
            to={`/tournaments/${event.id}`}
          >
            <Trophy size={16} />
            Event details
          </Link>
        }
      />
      <div className="pickems-note">
        <Target size={16} />
        <span>
          Picks are saved only in this device and browser. They are not synced
          to an account and are not part of an official leaderboard, scoring, or
          prizes.
        </span>
      </div>
      <div className="pickems-layout">
        <div className="pickems-main">
          <Card className="pickems-event-select">
            <label htmlFor="pickems-event">Live tournament</label>
            <select
              id="pickems-event"
              value={eventId}
              onChange={(e) => changeEvent(e.target.value)}
            >
              {liveTournaments.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <span
              className={`status-label status-${event.status.toLowerCase().replaceAll(" ", "-")}`}
            >
              <i />
              {event.status}
            </span>
          </Card>
          {questions.length ? (
            <>
              <SectionHeading
                title="Your predictions"
                action={
                  <span className="result-count">
                    {Object.keys(eventPicks).length} of {questions.length}{" "}
                    picked
                  </span>
                }
              />
              <div className="pickem-questions">
                {questions.map((question, index) => (
                  <Card className="pickem-question" key={question.id}>
                    <div className="pickem-question-head">
                      <span>PICK {String(index + 1).padStart(2, "0")}</span>
                      <span>{question.group}</span>
                    </div>
                    <h3>{question.title}</h3>
                    <div className="pickem-answer-list">
                      {question.options.map((option) => {
                        const selected =
                          eventPicks[question.id] === option.name;
                        const matchedTeam = teams.find(
                          (team) =>
                            normalizedName(team.name) ===
                            normalizedName(option.name),
                        );
                        const initials = option.name
                          .split(/\s+/)
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2);
                        return (
                          <button
                            type="button"
                            key={option.name}
                            className={`pickem-answer${selected ? " selected" : ""}`}
                            aria-pressed={selected}
                            onClick={() => {
                              const nextPicks = {
                                ...picks,
                                [event.id]: {
                                  ...eventPicks,
                                  [question.id]: option.name,
                                },
                              };
                              setStoredState({
                                picks: nextPicks,
                                submittedEvents: submittedEvents.filter(
                                  (id) => id !== event.id,
                                ),
                              });
                              setMessage("");
                              setError("");
                            }}
                          >
                            <TeamLogoBadge
                              name={option.name}
                              logoUrl={option.logoUrl ?? matchedTeam?.logoUrl}
                              initials={initials}
                              size="small"
                            />
                            <span>{option.name}</span>
                            {selected && <CheckCircle2 size={16} />}
                          </button>
                        );
                      })}
                    </div>
                  </Card>
                ))}
              </div>
              <div className="pickems-actions">
                <button className="button button-primary" onClick={savePicks}>
                  <CheckCircle2 size={16} />
                  {submitted ? "Update picks" : "Lock in picks"}
                </button>
                <button
                  className="button button-secondary"
                  onClick={clearPicks}
                >
                  Clear picks
                </button>
              </div>
              {message && (
                <div className="pickems-feedback success" role="status">
                  <CheckCircle2 size={16} />
                  {message}
                </div>
              )}
              {error && (
                <div className="pickems-feedback error" role="alert">
                  <CircleHelp size={16} />
                  {error}
                </div>
              )}
            </>
          ) : (
            <Card className="empty-state">
              <b>Live event participant data is unavailable</b>
              <p>Open the tournament page for its current event information.</p>
              <Link className="text-link" to={`/tournaments/${event.id}`}>
                View event details <ArrowRight size={14} />
              </Link>
            </Card>
          )}
        </div>
        <aside className="pickems-aside">
          <Card className="pickems-summary">
            <span className="card-overline">YOUR PICKS</span>
            <b className="pickems-score">
              {Object.keys(eventPicks).length}
              <small> / {questions.length}</small>
            </b>
            <p>
              {submitted
                ? "Your predictions are locked in on this device."
                : "Complete each live tournament pick and lock them in."}
            </p>
            <div className="pickems-progress">
              <i
                style={{
                  width: `${questions.length ? (Object.keys(eventPicks).length / questions.length) * 100 : 0}%`,
                }}
              />
            </div>
            <div className="pickems-summary-foot">
              <span>Status</span>
              <b>{submitted ? "Locked" : "Draft"}</b>
            </div>
          </Card>
          <Card className="pickems-how">
            <span className="card-overline">HOW TO PLAY</span>
            <ol>
              <li>Choose the live tournament question.</li>
              <li>Pick a team from that event’s participant list.</li>
              <li>Lock in your predictions on this device.</li>
            </ol>
            <p>Predictions do not affect official standings or prizes.</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function TournamentCard({
  item,
  favorite,
  onFavorite,
}: {
  item: Tournament;
  favorite: boolean;
  onFavorite: () => void;
}) {
  const archiveTitle = item.archiveSeries
    ? (archiveSeriesFullNames[item.archiveSeries] ?? item.editionLabel)
    : item.name;
  const seasonLabel =
    item.archiveSeries === "BGMS"
      ? item.editionLabel?.match(/Season\s+\d+/)?.[0]
      : undefined;
  return (
    <Card className="tournament-card">
      <div className={`game-banner ${item.color}`}>
        <TournamentLogo item={item} size="normal" />
        <span>{item.game}</span>
        <button
          className={`heart-button${favorite ? " selected" : ""}`}
          onClick={onFavorite}
          aria-label={favorite ? "Remove favorite" : "Add favorite"}
        >
          <Heart size={17} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="tournament-card-body">
        <Link className="tournament-title" to={`/tournaments/${item.id}`}>
          {item.isArchiveEdition ? (
            <span className="tournament-edition-heading">
              <b>{archiveTitle ?? item.name}</b>
              {seasonLabel && (
                <small className="edition-season">{seasonLabel}</small>
              )}
              <small className="edition-year">{item.archiveYear}</small>
            </span>
          ) : (
            item.name
          )}
          <ArrowUpRight size={15} />
        </Link>
        <div className="meta-line">
          <CalendarDays size={13} />
          {item.date}
        </div>
        <div className="tournament-footer">
          <span
            className={`status-label status-${item.status.toLowerCase().replaceAll(" ", "-")}`}
          >
            <i />
            {item.status}
          </span>
          <span className="prize-value">
            {item.isArchiveEdition && item.winner ? item.winner : item.prize}
            <small>
              {item.isArchiveEdition && item.winner
                ? " champion"
                : " prize pool"}
            </small>
          </span>
        </div>
        <Link className="text-link" to={`/tournaments/${item.id}`}>
          View event details <ArrowRight size={13} />
        </Link>
      </div>
    </Card>
  );
}

function Standings({ rows }: { rows: Team[] }) {
  return (
    <div className="standings-list">
      {rows.map((team, i) => (
        <Link key={team.id} className="standing-row" to={`/teams/${team.id}`}>
          <span className={`rank-number${i === 0 ? " first" : ""}`}>
            {String(team.rank).padStart(2, "0")}
          </span>
          <TeamLogo team={team} size="small" />
          <span className="standing-name">
            {team.name}
            <small>{team.game}</small>
          </span>
          <span className="points">
            {team.points.toLocaleString()}
            <small>pts</small>
          </span>
        </Link>
      ))}
    </div>
  );
}

function TournamentStandings({
  rows = cegcGroupAStandings,
  matchesPlayed,
}: {
  rows?: TournamentStanding[];
  matchesPlayed?: number;
}) {
  const detailed = rows.some(
    (row) =>
      row.placementPoints !== undefined || row.eliminations !== undefined,
  );
  return (
    <div
      className={`source-standings${detailed ? " detailed-standings" : ""}`}
      data-horizontal-scroll="true"
    >
      <table aria-label="Tournament standings">
        <thead>
          <tr>
            <th scope="col" className="standing-rank-col">
              #
            </th>
            <th scope="col" className="standing-team-col">
              Team
            </th>
            {detailed && (
              <th scope="col" className="standing-matches-col">
                MP
              </th>
            )}
            <th scope="col" className="standing-wins-col">
              WWCD
            </th>
            {detailed && (
              <>
                <th scope="col" className="standing-place-col">
                  Place
                </th>
                <th scope="col" className="standing-elims-col">
                  Elims
                </th>
              </>
            )}
            <th scope="col" className="standing-points-col">
              Pts
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const team = teams.find(
              (entry) =>
                entry.name === row.name ||
                (entry.id === "8bit" && row.name === "iQOO 8Bit"),
            );
            const participant = tournamentParticipants["cegc-2026"]?.find(
              (entry) =>
                entry.name === row.name ||
                (row.name === "Epigrotive Gaming" &&
                  entry.name === "GoSolo Epigrotive Gaming") ||
                (row.name === "Team Tamilas" &&
                  entry.name === "iQOO Team Tamilas") ||
                (row.name === "HiggBoson Esports" &&
                  entry.name === "GoSolo Higgboson"),
            );
            const logoUrl = team?.logoUrl ?? participant?.logoUrl;
            const initials = row.name
              .split(/\s+/)
              .map((part) => part[0])
              .join("")
              .slice(0, 2);
            const name = (
              <>
                <TeamLogoBadge
                  name={row.name}
                  logoUrl={logoUrl}
                  initials={initials}
                  size="small"
                />
                <b>{row.name}</b>
              </>
            );
            return (
              <tr key={`${row.rank}-${row.name}`}>
                <td className="standing-rank-cell">{row.rank}</td>
                <td className="standing-team-cell">
                  {team ? (
                    <Link to={`/teams/${team.id}`}>{name}</Link>
                  ) : (
                    <span>{name}</span>
                  )}
                </td>
                {detailed && (
                  <td className="standing-number-cell">
                    {matchesPlayed ?? "—"}
                  </td>
                )}
                <td className="standing-number-cell">{row.wins ?? "—"}</td>
                {detailed && (
                  <>
                    <td className="standing-number-cell">
                      {row.placementPoints ?? "—"}
                    </td>
                    <td className="standing-number-cell">
                      {row.eliminations ?? "—"}
                    </td>
                  </>
                )}
                <td className="standing-points-cell">{row.points ?? "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TeamLogoBadge({
  name,
  logoUrl,
  initials,
  accent = "rose",
  size = "normal",
}: {
  name: string;
  logoUrl?: string;
  initials: string;
  accent?: string;
  size?: "small" | "normal" | "large";
}) {
  const [failed, setFailed] = useState(false);
  const dimensions = size === "small" ? 26 : size === "large" ? 48 : 40;
  return (
    <span className={`team-logo team-logo-${size} ${accent}`}>
      {logoUrl && !failed ? (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          width={dimensions}
          height={dimensions}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <b>{initials}</b>
      )}
    </span>
  );
}
function TeamLogo({
  team,
  size = "normal",
}: {
  team: Team;
  size?: "small" | "normal" | "large";
}) {
  return (
    <TeamLogoBadge
      name={team.name}
      logoUrl={team.logoUrl}
      initials={team.initials}
      accent={team.accent}
      size={size}
    />
  );
}
function TournamentLogo({
  item,
  size = "normal",
}: {
  item: Tournament;
  size?: "normal" | "large";
}) {
  const [failed, setFailed] = useState(false);
  const dimensions = size === "large" ? 92 : 40;
  return (
    <span
      className={`tournament-logo tournament-logo-${size} ${item.color}`}
      aria-label={`${item.name} logo`}
    >
      {item.logoUrl && !failed ? (
        <img
          src={item.logoUrl}
          alt={`${item.name} logo`}
          width={dimensions}
          height={dimensions}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <b aria-hidden="true">{item.mark}</b>
      )}
    </span>
  );
}
function TournamentParticipantList({
  tournamentId,
  entries,
}: {
  tournamentId: string;
  entries: TournamentParticipant[];
}) {
  const groups = entries.reduce<Record<string, TournamentParticipant[]>>(
    (all, entry) => {
      const key = entry.route ?? "Participants";
      (all[key] ??= []).push(entry);
      return all;
    },
    {},
  );
  const rosters = tournamentRosters[tournamentId] ?? {};
  const rosterFor = (name: string) =>
    rosters[name] ??
    rosters[
      (
        { "Zero Ark Official": "Zero Ark", "Team 8BIT": "8Bit" } as Record<
          string,
          string
        >
      )[name] ?? ""
    ];
  const rosterCount = entries.filter(
    ({ name }) => rosterFor(name)?.players.length,
  ).length;
  return (
    <>
      <p className="roster-coverage">
        Lineups available for {rosterCount} of {entries.length} teams. Select a
        team to view registered starters and substitutes.
      </p>
      <div className="tournament-participant-groups">
        {Object.entries(groups).map(([route, group]) => (
          <section className="tournament-participant-group" key={route}>
            <h3>
              {route}
              <span>{group.length}</span>
            </h3>
            <div className="tournament-participant-grid">
              {group.map(({ name, logoUrl }) => {
                const team = teams.find(
                  (entry) =>
                    entry.name.toLowerCase() === name.toLowerCase() ||
                    name.toLowerCase().includes(entry.name.toLowerCase()),
                );
                const initials = name
                  .split(/\s+/)
                  .map((word) => word[0])
                  .join("")
                  .replace(/[^A-Z0-9]/gi, "")
                  .slice(0, 2);
                const roster = rosterFor(name);
                const content = (
                  <>
                    <TeamLogoBadge
                      name={name}
                      logoUrl={logoUrl ?? team?.logoUrl}
                      initials={initials}
                      accent={team?.accent}
                      size="small"
                    />
                    <b>{name}</b>
                  </>
                );
                return (
                  <details className="participant-roster" key={name}>
                    <summary>
                      {content}
                      <span className="roster-hint">
                        {roster
                          ? `${roster.players.length}${roster.substitutes?.length ? ` + ${roster.substitutes.length}` : ""} players`
                          : "Roster"}
                      </span>
                      <ChevronDown size={15} />
                    </summary>
                    <div className="participant-roster-content">
                      {team && (
                        <Link className="text-link" to={`/teams/${team.id}`}>
                          View {team.name} profile <ArrowRight size={13} />
                        </Link>
                      )}
                      {roster ? (
                        <>
                          {roster.captain && (
                            <span>IGL · {roster.captain}</span>
                          )}
                          <b>Registered starters</b>
                          <div>
                            {roster.players.map((player) => (
                              <span className="roster-player" key={player}>
                                {player}
                              </span>
                            ))}
                          </div>
                          {Boolean(roster.substitutes?.length) && (
                            <>
                              <b>Substitutes</b>
                              <div>
                                {roster.substitutes?.map((player) => (
                                  <span className="roster-player" key={player}>
                                    {player}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <p>Player lineup has not been listed for this team.</p>
                      )}
                    </div>
                  </details>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
function ResultSubsection({
  title,
  id,
  rows,
  note,
  matchesPlayed,
}: {
  title: string;
  id: string;
  rows: TournamentStanding[];
  note: string;
  matchesPlayed?: number;
}) {
  return (
    <section className="wiki-subsection" id={id}>
      <h3 className="wiki-subheading">{title}</h3>
      {rows.length ? (
        <TournamentStandings rows={rows} matchesPlayed={matchesPlayed} />
      ) : (
        <p className="wiki-empty">{note}</p>
      )}
    </section>
  );
}

function archiveSchedule(item: Tournament): [string, string, string][] {
  const date = item.date;
  switch (item.archiveSeries) {
    case "BGIS":
      return [
        [
          "Open & in-game qualifiers",
          date,
          "The open entry route advanced eligible squads into the regional qualification rounds.",
        ],
        [
          "Quarter Finals",
          date,
          "Qualified squads competed for places in the later stages.",
        ],
        [
          "Semi Finals",
          date,
          "The remaining teams played to determine the Grand Finals field.",
        ],
        [
          "Grand Finals",
          date,
          `${item.teams ?? "Qualified"} teams contested the final stage. ${item.winner ?? "The final standings"} decided the champion.`,
        ],
      ];
    case "BMPS":
      return [
        [
          "Qualification rounds",
          date,
          "Teams advanced through the series qualification rounds toward the main event.",
        ],
        [
          "League / Semi Finals",
          date,
          "The field was reduced to the teams advancing to the final stage.",
        ],
        [
          "Grand Finals",
          date,
          `${item.teams ?? "Qualified"} teams played for the Pro Series title. ${item.winner ?? "Final standings"} determined the result.`,
        ],
      ];
    case "BGMS":
      return [
        [
          "League Stage",
          date,
          "Invited squads competed across the season league and accumulated points for qualification.",
        ],
        [
          "Playoffs",
          date,
          "The qualified teams played for Grand Finals places.",
        ],
        [
          "Grand Finals",
          date,
          `${item.winner ?? "The leading team"} finished as season champion${item.runnerUp ? ` ahead of ${item.runnerUp}` : ""}.`,
        ],
      ];
    case "BMSD":
      return [
        [
          "Qualification & league stages",
          date,
          "Teams progressed through the event stages to determine the Grand Finals field.",
        ],
        [
          "Grand Finals",
          date,
          `${item.teams ?? "Qualified"} teams competed for the Showdown title. ${item.winner ?? "Final standings"} finished first.`,
        ],
      ];
    case "BMIC":
      return [
        [
          "Matchday 1",
          date,
          "Six matches opened the three-day international finals.",
        ],
        [
          "Matchday 2",
          date,
          "Six matches contributed to the cumulative overall standings.",
        ],
        [
          "Matchday 3",
          date,
          "The final six matches determined the champion and final placements.",
        ],
      ];
    case "IN-KR":
      return [
        [
          "Grand Finals",
          date,
          `Sixteen invited teams played 15 matches. ${item.winner ?? "Final standings"} determined the champion.`,
        ],
      ];
    case "PMGC":
      return [
        [
          "Qualification / league stage",
          date,
          "Regional and league-stage results determined which teams advanced.",
        ],
        [
          "Final qualification stage",
          date,
          "Remaining slots for the championship final were decided.",
        ],
        [
          "Grand Finals",
          date,
          `${item.winner ?? "The leading team"} won the global title${item.runnerUp ? ` ahead of ${item.runnerUp}` : ""}.`,
        ],
      ];
    case "PMWC":
      return [
        [
          "Group Stage",
          date,
          "The international field competed for direct Grand Finals places and advancement.",
        ],
        [
          "Survival / qualification stage",
          date,
          "Teams competed for the remaining Grand Finals positions.",
        ],
        [
          "Grand Finals",
          date,
          `${item.winner ?? "The leading team"} won the World Cup${item.runnerUp ? ` ahead of ${item.runnerUp}` : ""}.`,
        ],
      ];
    default:
      return [[item.name, date, item.formatDetail]];
  }
}

function ArticleRow({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <Link
      className={`article-row${featured ? " article-featured" : ""}`}
      to={`/news/${article.id}`}
    >
      <span className="article-thumb">
        <Newspaper size={20} />
      </span>
      <span className="article-copy">
        <small>{article.category}</small>
        <b>{article.title}</b>
        <span>
          {article.date} · {article.readTime}
        </span>
      </span>
      <ArrowUpRight size={15} className="article-arrow" />
    </Link>
  );
}

function EventList({ items }: { items: Event[] }) {
  return (
    <Card className="event-list">
      {items.map((event) => (
        <Link
          to={`/tournaments/${event.id}`}
          className="event-row-main event-row"
          key={event.id}
        >
          <div className="event-date">
            <b>{event.day}</b>
            <span>{event.month}</span>
          </div>
          <div className="event-copy">
            <b>{event.title}</b>
            <span>{event.meta}</span>
          </div>
          <span className="event-type">Tournament</span>
          <ChevronRight size={17} />
        </Link>
      ))}
    </Card>
  );
}

function TournamentsPage({
  favorites,
  toggleFavorite,
}: {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}) {
  const [filter, setFilter] = useState("All events");
  const [series, setSeries] = useState("All series");
  const [year, setYear] = useState("All years");
  const archiveYears = [
    ...new Set(
      tournaments
        .filter((item) => item.isArchiveEdition)
        .map((item) => item.archiveYear)
        .filter((item): item is string => Boolean(item)),
    ),
  ].sort((a, b) => Number(b) - Number(a));
  const items = tournaments.filter(
    (item) =>
      (filter === "All events" || item.status === filter) &&
      (series === "All series" || item.archiveSeries === series) &&
      (year === "All years" || item.archiveYear === year),
  );
  const seriesOptions = [
    "BGIS",
    "BMPS",
    "BGMS",
    "BMSD",
    "BMIC",
    "CEGC",
    "IN-KR",
    "PMGC",
    "PMWC",
  ];
  const visibleArchiveCount = items.filter(
    (item) => item.isArchiveEdition,
  ).length;
  const archiveSummary =
    year !== "All years"
      ? `${visibleArchiveCount} edition${visibleArchiveCount === 1 ? "" : "s"} · ${year}`
      : series !== "All series"
        ? `${visibleArchiveCount} ${series} edition${visibleArchiveCount === 1 ? "" : "s"}`
        : `${visibleArchiveCount} editions`;
  const statusOrder: Tournament["status"][] = [
    "Live now",
    "Upcoming",
    "Completed",
  ];
  const yearOf = (item: Tournament) =>
    item.archiveYear ??
    item.date.match(/\b(?:19|20)\d{2}\b/)?.[0] ??
    "Year not listed";
  const statuses =
    filter === "All events" ? statusOrder : [filter as Tournament["status"]];
  return (
    <div className="page-content">
      <PageHeader
        eyebrow="COMPETE · FOLLOW · REPEAT"
        title="Tournaments"
        description="The events, schedules and prize pools shaping the season."
        action={
          <Link className="button button-primary" to="/calendar">
            <CalendarDays size={16} />
            Browse calendar
          </Link>
        }
      />
      <DataNotice />
      <div className="archive-controls">
        <div className="filter-tabs">
          {["All events", "Upcoming", "Live now", "Completed"].map((label) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={filter === label ? "selected" : ""}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="archive-series-filter">
          <span>Series</span>
          <select
            value={series}
            onChange={(event) => setSeries(event.target.value)}
          >
            <option>All series</option>
            {seriesOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="archive-series-filter">
          <span>Year</span>
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
          >
            <option>All years</option>
            {archiveYears.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="archive-summary">
        <b>{archiveSummary}</b>
        <span>BGMI and PUBG Mobile tournament history</span>
      </div>
      {items.length ? (
        statuses.map((status) => {
          const statusItems = items.filter((item) => item.status === status);
          if (!statusItems.length) return null;
          const years = [...new Set(statusItems.map(yearOf))].sort(
            (a, b) => Number(b) - Number(a),
          );
          return (
            <section className="tournament-status-section" key={status}>
              <SectionHeading
                title={status}
                action={
                  <span className="tournament-section-count">
                    {statusItems.length}{" "}
                    {statusItems.length === 1 ? "event" : "events"}
                  </span>
                }
              />
              {years.map((eventYear) => (
                <div
                  className="tournament-year-group"
                  key={`${status}-${eventYear}`}
                >
                  <h3>{eventYear}</h3>
                  <div className="tournament-grid page-tournament-grid">
                    {statusItems
                      .filter((item) => yearOf(item) === eventYear)
                      .map((item) => (
                        <TournamentCard
                          key={item.id}
                          item={item}
                          favorite={favorites.includes(item.id)}
                          onFavorite={() => toggleFavorite(item.id)}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </section>
          );
        })
      ) : (
        <Card className="empty-state">
          <b>No tournaments match these filters</b>
          <p>Choose another series or year.</p>
        </Card>
      )}
      <SectionHeading title="Event schedule" />
      <EventList items={events} />
    </div>
  );
}

function TournamentDetail({
  favorites,
  toggleFavorite,
}: {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}) {
  const { id = "" } = useParams();
  const item = tournaments.find((entry) => entry.id === id);
  if (!item)
    return (
      <EmptyPage
        title="Tournament not found"
        description="This event may have moved or ended."
      />
    );
  if (item.id === "bgis-2026")
    return (
      <Suspense fallback={<PageLoading />}>
        <BGIS2026Detail
          item={item}
          favorite={favorites.includes(item.id)}
          onFavorite={() => toggleFavorite(item.id)}
        />
      </Suspense>
    );
  const standings: TournamentStanding[] = tournamentStandings[item.id] ?? [];
  const prizeRows = tournamentPrizes[item.id] ?? [];
  const participants = tournamentParticipants[item.id] ?? [];
  const relatedArticles = articles.filter((article) =>
    item.id === "bmic-2026"
      ? article.id === "bmic-international"
      : item.id === "bmsd-2026"
        ? article.id === "soul-bmsd-champions"
        : item.id === "google-play-arena-2026"
          ? article.id === "google-play-arena-launch"
          : false,
  );
  const schedule: [string, string, string][] =
    item.id === "cegc-2026"
      ? [
          [
            "Group Stage 1",
            "Nov 3–6 · Nov 10–13",
            "32 teams begin in two groups of 16. The first four matchdays use separate group tables; the bottom eight from each group then swap groups. Points carry into the shared Phase 2 standings.",
          ],
          [
            "Group Stage 2",
            "Nov 14–16",
            "The 24 teams outside the top eight play for advancement. The top eight move to the Upper Bracket; the remaining teams continue in the Lower Bracket.",
          ],
          [
            "Upper Bracket",
            "Nov 17–20",
            "Sixteen teams compete. The top eight qualify directly for the Grand Finals.",
          ],
          [
            "Lower Bracket",
            "Nov 21–22",
            "Sixteen teams compete for a route to the Last Chance Qualifier.",
          ],
          [
            "Last Chance Qualifier",
            "Nov 27–29",
            "The bottom eight from the Upper Bracket and top eight from the Lower Bracket contest the remaining Grand Finals places.",
          ],
          [
            "Grand Finals",
            "Dec 11–13 · Chennai LAN",
            "Sixteen teams play the final stage for the ₹75 lakh prize pool.",
          ],
        ]
      : item.id === "cegc-2025"
        ? [
            [
              "Luna Open Qualifier",
              "Oct 21–22, 2025",
              "Open qualifier; the leading team advanced to the semi-finals.",
            ],
            [
              "Closed Qualifier",
              "Oct 23–24, 2025",
              "Three teams advanced from the closed qualifier to the semi-finals.",
            ],
            [
              "Semi-Finals",
              "Nov 4–7, 2025",
              "Twenty-four teams played 16 matches each. The top eight advanced directly to the Grand Finals; the rest moved to the Last Chance Qualifier.",
            ],
            [
              "Last Chance Qualifier",
              "Nov 8–11, 2025",
              "Sixteen teams contested 24 matches for the final eight Grand Finals places.",
            ],
            [
              "Grand Finals",
              "Nov 14–16 · Chennai LAN",
              "Sixteen teams played for the ₹50 lakh prize pool. The Smash Rule was activated; Team SouL won on Match 16 after reaching the target-point threshold.",
            ],
          ]
        : item.id === "bmic-2025"
          ? [
              [
                "Matchday 1",
                "Oct 31, 2025",
                "Six matches opened the 16-team international finals.",
              ],
              [
                "Matchday 2",
                "Nov 1, 2025",
                "Six matches contributed to the overall standings.",
              ],
              [
                "Matchday 3",
                "Nov 2, 2025",
                "The final six matches decided the champion and PMGC qualification.",
              ],
            ]
          : item.id === "bmps-2026"
            ? [
                [
                  "Round 1",
                  "May 6 onward · detailed match dates vary",
                  "Opening stage of the 64-team series.",
                ],
                [
                  "Round 2",
                  "May · detailed match dates vary",
                  "Teams progress through the second qualifying stage.",
                ],
                [
                  "Round 3",
                  "May · detailed match dates vary",
                  "The field narrows ahead of the final qualification stages.",
                ],
                [
                  "Round 4",
                  "May · detailed match dates vary",
                  "The top eight from Group A qualify directly for Grand Finals.",
                ],
                [
                  "Survival Stage",
                  "Jun 2–5",
                  "Thirty-two teams compete for advancement.",
                ],
                [
                  "Semi Finals",
                  "Jun 9–12",
                  "The top six teams qualify for Grand Finals.",
                ],
                [
                  "Last Chance",
                  "Jun 13–14",
                  "Sixteen teams play 12 matches; the top two qualify for Grand Finals.",
                ],
                [
                  "Grand Finals",
                  "Jun 19–21",
                  "Sixteen teams play 18 matches at Jaipur Exhibition & Convention Centre. GodLike Esports finish first on 162 points.",
                ],
              ]
            : item.id === "bgms-2026"
              ? [
                  [
                    "League · Week 1",
                    "Aug 10–13",
                    "The 26-team league opens with four matchdays.",
                  ],
                  [
                    "Bounty Weekend",
                    "Aug 14–16",
                    "A special weekend stage follows the opening league week.",
                  ],
                  [
                    "League · Week 2",
                    "Aug 17–20",
                    "Teams continue the league campaign over four matchdays.",
                  ],
                  [
                    "Super Weekend 1",
                    "Aug 21–23",
                    "The first super weekend adds to cumulative league standings.",
                  ],
                  [
                    "League · Week 3",
                    "Aug 24–27",
                    "Teams play the final league week.",
                  ],
                  [
                    "Super Weekend 2",
                    "Aug 28–30",
                    "The second super weekend completes the league standings.",
                  ],
                  [
                    "Playoffs",
                    "Aug 31–Sep 2",
                    "The playoff stage determines the finalists.",
                  ],
                  [
                    "Grand Finals",
                    "Sep 4–6",
                    "The final stage decides the Season 5 champion. Nebula Esports finish first.",
                  ],
                ]
              : item.id === "bmic-2026"
                ? [
                    [
                      "Matchday 1",
                      "Oct 30",
                      "Six Squads TPP matches across the scheduled map rotation.",
                    ],
                    [
                      "Matchday 2",
                      "Oct 31",
                      "Six matches continue the cumulative overall standings.",
                    ],
                    [
                      "Matchday 3",
                      "Nov 1",
                      "The final six matches decide the champion and PMGC qualification.",
                    ],
                  ]
                : item.id === "bmsd-2026"
                  ? [
                      [
                        "League stages",
                        "Sep 22–Oct 8",
                        "The 48-team field progresses through the opening league stages.",
                      ],
                      [
                        "Playoffs & qualification",
                        "Oct 9–15",
                        "Teams compete for places in the final stage.",
                      ],
                      [
                        "Grand Finals",
                        "Oct 16–18",
                        "The final 18 matches decide the title. Team SouL wins with 155 points.",
                      ],
                    ]
                  : item.id === "pmgc-2026"
                    ? [
                        [
                          "The Gauntlet",
                          "Nov–Dec · dates to be confirmed",
                          "Qualified teams compete for places in the Group Stage.",
                        ],
                        [
                          "Group Stage",
                          "Nov–Dec · dates to be confirmed",
                          "Teams compete for direct qualification to the Grand Finals.",
                        ],
                        [
                          "Grand Finals",
                          "Nov–Dec · Istanbul",
                          "The 2026 world champion will be decided in Istanbul.",
                        ],
                      ]
                    : item.id === "google-play-arena-2026"
                      ? [
                          [
                            "Qualification",
                            "Dec 14–19",
                            "Team qualification and event schedule details are pending confirmation.",
                          ],
                          [
                            "Grand Finals",
                            "Dec 20",
                            "The listed 16-team final stage. Match count and confirmed participants are pending.",
                          ],
                        ]
                      : item.isArchiveEdition
                        ? archiveSchedule(item)
                        : [[item.name, item.date, item.formatDetail]];
  return (
    <div className="page-content tournament-detail-page">
      <Link to="/tournaments" className="back-link">
        <ChevronLeft size={16} />
        All tournaments
      </Link>
      <div className={`event-identity ${item.color}`}>
        <TournamentLogo item={item} size="large" />
        <div className="event-identity-copy">
          <span
            className={`status-label status-${item.status.toLowerCase().replaceAll(" ", "-")}`}
          >
            <i />
            {item.status}
          </span>
          {item.archiveYear && (
            <span className="event-edition-year">
              {item.archiveSeries} · {item.archiveYear}
            </span>
          )}
          <h1>{item.name}</h1>
          <p>
            <CalendarDays size={14} />
            {item.date}
            <i /> <Compass size={14} />
            {item.location}
          </p>
        </div>
        <button
          className={`button ${favorites.includes(item.id) ? "button-primary" : "button-secondary"} event-save`}
          onClick={() => toggleFavorite(item.id)}
        >
          <Heart
            size={16}
            fill={favorites.includes(item.id) ? "currentColor" : "none"}
          />
          {favorites.includes(item.id) ? "Saved" : "Save event"}
        </button>
      </div>
      <DataNotice />
      <div className="event-stats-grid">
        <Card>
          <small>GAME</small>
          <b>{item.game}</b>
          <span>{item.competitionMode ?? item.format}</span>
        </Card>
        <Card>
          <small>PRIZE POOL</small>
          <b>{item.prize}</b>
          <span>
            {item.status === "Completed"
              ? "Awarded purse"
              : "Announced prize pool"}
          </span>
        </Card>
        <Card>
          <small>PARTICIPANTS</small>
          <b>{item.teams ? `${item.teams} teams` : "—"}</b>
          <span>{item.tier ?? "Tournament field"}</span>
        </Card>
        <Card>
          <small>STAGES</small>
          <b>{item.stages ?? "—"}</b>
          <span>
            {item.season ? `Season ${item.season}` : "Tournament stages"}
          </span>
        </Card>
        <Card>
          <small>MATCHES</small>
          <b>{item.matches ?? "—"}</b>
          <span>
            {item.status === "Completed"
              ? "Completed matches"
              : item.status === "Live now"
                ? "Matches listed"
                : "Scheduled so far"}
          </span>
        </Card>
        <Card>
          <small>ORGANIZER</small>
          <b>{item.organizer}</b>
          <span>{item.eventType ?? "Event organizer"}</span>
        </Card>
      </div>
      <div className="detail-grid">
        <div className="event-detail-main">
          <Card className="detail-main wiki-section" id="about">
            <h2 className="wiki-heading">About</h2>
            <p className="body-copy">{item.description}</p>
            <div className="event-format-panel">
              <TournamentLogo item={item} />
              <div>
                <small>TOURNAMENT</small>
                <b>{item.name}</b>
                <p>
                  {item.game} · {item.organizer} · {item.location}
                </p>
              </div>
            </div>
          </Card>
          <Card className="detail-main wiki-section" id="format">
            <h2 className="wiki-heading">Format</h2>
            <div className="detail-facts">
              <div>
                <small>FORMAT</small>
                <b>{item.format}</b>
              </div>
              <div>
                <small>GAME MODE</small>
                <b>{item.competitionMode ?? `${item.game} squads`}</b>
              </div>
              <div>
                <small>EVENT TYPE</small>
                <b>{item.eventType ?? "—"}</b>
              </div>
            </div>
            <p className="body-copy">
              {item.formatDetail}{" "}
              {item.tier ? `Competition tier: ${item.tier}.` : ""}
            </p>
            <div className="format-extra">
              <span>
                <small>ORGANIZER</small>
                <b>{item.organizer}</b>
              </span>
              <span>
                <small>LIVE COVERAGE</small>
                <b>{item.broadcast}</b>
              </span>
            </div>
          </Card>
          <Card className="detail-main wiki-section" id="schedule">
            <h2 className="wiki-heading">Tournament schedule</h2>
            <div className="event-timeline">
              {schedule.map(([stage, date, detail], index) => (
                <article
                  className="event-timeline-row"
                  key={`${stage}-${index}`}
                >
                  <span className="event-timeline-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="event-timeline-content">
                    <div>
                      <b>{stage}</b>
                      <small>{date}</small>
                    </div>
                    <p>{detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </Card>
          <Card className="detail-main wiki-section" id="prize-pool">
            <h2 className="wiki-heading">Prize pool</h2>
            <div className="prize-pool-total">
              <span className="prize-icon">
                <Trophy size={21} />
              </span>
              <span>
                <small>TOTAL PRIZE POOL</small>
                <b>{item.prize}</b>
              </span>
            </div>
            <h3 className="wiki-subheading">Prize distribution</h3>
            <div className="distribution-table">
              <div className="distribution-row distribution-head">
                <span>PLACE / AWARD</span>
                <span>AMOUNT</span>
              </div>
              {prizeRows.length ? (
                <>
                  {prizeRows.map((row) => (
                    <div className="distribution-row" key={row.place}>
                      <span>
                        <b>{row.place}</b>
                      </span>
                      <span>{row.amount}</span>
                    </div>
                  ))}
                  <div className="distribution-row">
                    <span>Other placements and awards</span>
                    <span>See event breakdown</span>
                  </div>
                </>
              ) : item.winner ? (
                <>
                  {[item.winner, item.runnerUp, item.thirdPlace]
                    .filter((name): name is string => Boolean(name))
                    .map((name, index) => (
                      <div className="distribution-row" key={index}>
                        <span>
                          <b>
                            {["1st", "2nd", "3rd"][index]} · {name}
                          </b>
                        </span>
                        <span>—</span>
                      </div>
                    ))}
                  <div className="distribution-row">
                    <span>Other placements and awards</span>
                    <span>—</span>
                  </div>
                </>
              ) : (
                <div className="distribution-empty">
                  <span>Prize breakdown has not been announced.</span>
                  <span>Pending</span>
                </div>
              )}
            </div>
            <p className="fine-print">
              {prizeRows.length
                ? "Amounts shown for published placements; other award details may vary by event."
                : "Only the announced total purse is shown here."}
            </p>
          </Card>
          <Card className="detail-main wiki-section" id="participants">
            <h2 className="wiki-heading">Participants</h2>
            <p className="body-copy">
              {item.teams
                ? `${item.teams} teams in the tournament field.`
                : "The confirmed participant count has not been published."}
            </p>
            {participants.length ? (
              <TournamentParticipantList
                tournamentId={item.id}
                entries={participants}
              />
            ) : item.confirmedTeams ? (
              <div className="qualification-progress">
                <div>
                  <b>
                    {item.confirmedTeams} of {item.teams} team slots filled
                  </b>
                  <span>
                    Team names have not been confirmed in the available
                    listings.
                  </span>
                </div>
                <div className="progress-track">
                  <i
                    style={{
                      width: `${Math.round((item.confirmedTeams / item.teams!) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <p className="wiki-empty">
                Participant names are not published yet.
              </p>
            )}
          </Card>
          <Card className="detail-main wiki-section" id="results">
            <h2 className="wiki-heading">Results</h2>
            {item.status === "Live now" && item.asOf && (
              <p className="results-snapshot-note" role="note">
                Snapshot · data as of {item.asOf}. These are not live standings
                and may have changed since this update.
              </p>
            )}
            {item.id === "cegc-2026" ? (
              <>
                <ResultSubsection
                  title="Group A · Phase 1 · 12 matches"
                  id="result-group-a"
                  rows={cegcGroupAStandings}
                  matchesPlayed={12}
                  note="Group A standings are not available yet."
                />
                <ResultSubsection
                  title="Group B · Phase 1 · 12 matches"
                  id="result-group-b"
                  rows={cegcGroupBStandings}
                  matchesPlayed={12}
                  note="Group B standings are not available yet."
                />
                <ResultSubsection
                  title="Grand Finals"
                  id="result-finals"
                  rows={[]}
                  note="Scheduled for Dec 11–13, 2026 in Chennai."
                />
              </>
            ) : (
              <ResultSubsection
                title={
                  item.status === "Completed"
                    ? item.isArchiveEdition
                      ? "Final podium"
                      : "Grand Finals standings"
                    : "Tournament standings"
                }
                id="result-finals"
                rows={item.status === "Completed" ? standings : []}
                note={
                  item.status === "Completed"
                    ? item.winner
                      ? `Champion: ${item.winner}${item.runnerUp ? ` · Runner-up: ${item.runnerUp}` : ""}. Complete match standings were not available for this archive page.`
                      : "Final standings are not available yet."
                    : `Standings will appear as matches are completed. Tournament dates: ${item.date}.`
                }
              />
            )}
          </Card>
          {relatedArticles.length > 0 && (
            <Card className="detail-main">
              <SectionHeading title="Related story" />
              {relatedArticles.map((article) => (
                <ArticleRow key={article.id} article={article} featured />
              ))}
            </Card>
          )}
        </div>
        <Card className="detail-side event-info-card">
          <span className="card-overline">ON THIS PAGE</span>
          <nav className="event-toc">
            <a href="#about">About</a>
            <a href="#format">Format</a>
            <a href="#schedule">Tournament schedule</a>
            <a href="#prize-pool">Prize pool</a>
            <a href="#participants">Participants</a>
            <a href="#results">Results</a>
            {item.id === "cegc-2026" && (
              <>
                <a href="#result-group-a">Group A standings</a>
                <a href="#result-group-b">Group B standings</a>
              </>
            )}
            <a href="#result-finals">Grand Finals</a>
          </nav>
          <span className="card-overline event-info-label">
            EVENT INFORMATION
          </span>
          <div className="detail-side-line">
            <CalendarDays size={17} />
            <span>
              <small>Dates</small>
              <b>{item.date}</b>
            </span>
          </div>
          <div className="detail-side-line">
            <Compass size={17} />
            <span>
              <small>Location</small>
              <b>{item.location}</b>
            </span>
          </div>
          <div className="detail-side-line">
            <Trophy size={17} />
            <span>
              <small>Prize pool</small>
              <b>{item.prize}</b>
            </span>
          </div>
          <div className="detail-side-line">
            <Users size={17} />
            <span>
              <small>Field size</small>
              <b>{item.teams ? `${item.teams} teams` : "—"}</b>
            </span>
          </div>
          <div className="detail-side-line">
            <Gamepad2 size={17} />
            <span>
              <small>Game</small>
              <b>{item.game}</b>
            </span>
          </div>
          <div className="event-side-note">
            <b>Stay in the loop</b>
            <p>Save this event to keep it in your CORE favorites.</p>
            <button
              className={`button ${favorites.includes(item.id) ? "button-primary" : "button-secondary"} full-button`}
              onClick={() => toggleFavorite(item.id)}
            >
              <Heart
                size={15}
                fill={favorites.includes(item.id) ? "currentColor" : "none"}
              />
              {favorites.includes(item.id)
                ? "Saved to favorites"
                : "Save event"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function TeamsPage() {
  const [search, setSearch] = useState("");
  const shown = teams.filter((team) =>
    `${team.name} ${team.game} ${team.region}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <div className="page-content">
      <PageHeader
        eyebrow="THE PEOPLE BEHIND THE PLAYS"
        title="Teams"
        description="Explore leading BGMI organizations, current standings and season highlights."
      />
      <DataNotice />
      <div className="toolbar">
        <label className="inline-search">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find a team"
          />
        </label>
        <span className="result-count">
          Showing {shown.length} of {teams.length} ranked teams
        </span>
      </div>
      {shown.length ? (
        <div className="team-grid">
          {shown.map((team) => (
            <TeamCard key={team.id} team={team} rank={team.rank} />
          ))}
        </div>
      ) : (
        <Card className="empty-state">
          <b>No matching team</b>
          <p>Try searching by team name.</p>
        </Card>
      )}
    </div>
  );
}

function TeamCard({ team, rank }: { team: Team; rank?: number }) {
  return (
    <Card className="team-card">
      <div className="team-card-head">
        <TeamLogo team={team} size="large" />
        <span className="team-card-rank">
          #{String(rank ?? team.rank).padStart(2, "0")} <small>KIE</small>
        </span>
      </div>
      <Link to={`/teams/${team.id}`} className="team-card-title">
        {team.name}
        <ArrowUpRight size={15} />
      </Link>
      <p>
        {team.game} <i /> {team.region}
      </p>
      <div className="team-card-footer">
        <span>
          <Trophy size={14} />
          {team.points.toLocaleString()} pts
        </span>
        <span className="roster-status">{team.trend} ranking trend</span>
      </div>
    </Card>
  );
}

function normalizedName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/^(team|iqoo)/, "")
    .replace(/(esports|esport|gaming)$/, "");
}
function playerSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
function eventTimestamp(event: Tournament) {
  const start = event.date.match(
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})/,
  );
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = Number(
    event.archiveYear ?? event.date.match(/20\d{2}/)?.[0] ?? 0,
  );
  return Date.UTC(
    year,
    start ? months.indexOf(start[1]) : 0,
    start ? Number(start[2]) : 1,
  );
}
function teamRecords(team: Team) {
  const target = normalizedName(team.name);
  return tournaments
    .flatMap((event) => {
      const participant = (tournamentParticipants[event.id] ?? []).find(
        (entry) => normalizedName(entry.name) === target,
      );
      const result = (tournamentStandings[event.id] ?? []).find(
        (entry) => normalizedName(entry.name) === target,
      );
      return participant || result
        ? [{ event, rank: result?.rank, points: result?.points }]
        : [];
    })
    .sort((a, b) =>
      (
        b.event.archiveYear ??
        b.event.date.match(/20\d{2}/)?.[0] ??
        ""
      ).localeCompare(
        a.event.archiveYear ?? a.event.date.match(/20\d{2}/)?.[0] ?? "",
      ),
    );
}
function teamRosters(team: Team) {
  const target = normalizedName(team.name);
  return Object.entries(tournamentRosters)
    .flatMap(([eventId, rosterMap]) => {
      const event = tournaments.find((entry) => entry.id === eventId);
      return event
        ? Object.entries(rosterMap)
            .filter(([name]) => normalizedName(name) === target)
            .map(([, roster]) => ({ event, roster }))
        : [];
    })
    .sort((a, b) => eventTimestamp(b.event) - eventTimestamp(a.event));
}
function playerLineups(name: string, aliases: string[] = []) {
  const targets = new Set([name, ...aliases].map(normalizedName));
  return Object.entries(tournamentRosters).flatMap(([eventId, rosterMap]) => {
    const event = tournaments.find((entry) => entry.id === eventId);
    if (!event) return [];
    return Object.entries(rosterMap).flatMap(([teamName, roster]) => {
      const starter = roster.players.find((player) =>
        targets.has(normalizedName(player)),
      );
      const substitute = roster.substitutes?.find((player) =>
        targets.has(normalizedName(player)),
      );
      return starter || substitute
        ? [
            {
              event,
              teamName,
              roster,
              listedName: starter ?? substitute!,
              position: starter ? "Registered player" : "Substitute",
            },
          ]
        : [];
    });
  });
}
function TeamDetail() {
  const { id = "" } = useParams();
  const team = teams.find((entry) => entry.id === id);
  if (!team)
    return (
      <EmptyPage
        title="Team not found"
        description="We couldn’t find this team profile."
      />
    );
  const results = teamRecords(team);
  const rosters = teamRosters(team);
  const activeRoster = rosters[0];
  const titles = results.filter(({ rank }) => rank === 1).length;
  const podiums = results.filter(({ rank }) => rank && rank <= 3).length;
  return (
    <div className="page-content profile-page">
      <Link to="/teams" className="back-link">
        <ChevronLeft size={16} />
        All teams
      </Link>
      <PageHeader
        eyebrow={`${team.game} · ${team.region} · KIE #${team.rank}`}
        title={team.name}
        description={`Season standings reviewed ${rankingUpdatedAt}.`}
      />
      <div className="team-profile-grid">
        <Card className="team-profile-card">
          <TeamLogo team={team} size="large" />
          <div>
            <h2>{team.name}</h2>
            <p>
              {team.game} · {team.region}
            </p>
            <span className="status-label">
              #{team.rank} KIE ranking · {team.trend}
            </span>
          </div>
        </Card>
        <Card className="profile-stat">
          <small>KIE RANKING POINTS</small>
          <b>{team.points.toLocaleString()}</b>
          <span>Rank #{team.rank} · leaderboard snapshot</span>
        </Card>
        <Card className="profile-stat">
          <small>RECORDED RESULTS</small>
          <b>{results.length}</b>
          <span>
            {titles} titles · {podiums} podiums
          </span>
        </Card>
      </div>
      <SectionHeading title="Tournament achievements" />
      {results.length ? (
        <Card className="profile-results">
          {results.map(({ event, rank, points }) => (
            <Link
              className="profile-result-row"
              to={`/tournaments/${event.id}`}
              key={event.id}
            >
              <span className="profile-result-rank">
                {rank ? `#${rank}` : "•"}
              </span>
              <span>
                <b>{event.name}</b>
                <small>
                  {event.archiveYear ?? event.date} ·{" "}
                  {rank ? `Place ${rank}` : "Participant"}
                  {points !== undefined ? ` · ${points} pts` : ""}
                </small>
              </span>
              <ChevronRight size={16} />
            </Link>
          ))}
        </Card>
      ) : (
        <Card className="profile-results">
          <p className="profile-note">
            No tournament result is currently linked to this team record.
          </p>
        </Card>
      )}
      <SectionHeading title="Active roster" />
      {activeRoster ? (
        <Card className="profile-roster">
          <div className="profile-roster-head">
            <span>
              <small>ACTIVE LINEUP</small>
              <b>{team.name}</b>
            </span>
          </div>
          <div className="profile-player-grid">
            {activeRoster.roster.players.map((name) => (
              <Link
                className="profile-player-card"
                to={`/players/${playerSlug(name)}`}
                key={name}
              >
                <span className="profile-player-initials">
                  {name.slice(0, 2).toUpperCase()}
                </span>
                <span>
                  <b>{name}</b>
                  <small>
                    {normalizedName(name) ===
                    normalizedName(activeRoster.roster.captain ?? "")
                      ? "Captain · "
                      : ""}
                    Player profile
                  </small>
                </span>
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="profile-results">
          <p className="profile-note">
            An active lineup is not recorded for this team yet.
          </p>
        </Card>
      )}
      <SectionHeading title="About the team" />
      <Card className="team-about-card">
        <p className="body-copy">
          {team.name} competes in {team.game} across {team.region}. CORE tracks
          its current ranking, published tournament results, and registered
          event lineups.
        </p>
        <p className="profile-note">
          Team ranking points are separate from tournament placement points.
        </p>
      </Card>
    </div>
  );
}
function PlayerDetail() {
  const { id = "" } = useParams();
  const { profiles, loaded } = usePlayerProfiles();
  const profile = profiles.find((entry) =>
    [entry.id, entry.name, ...entry.aliases].some(
      (alias) => playerSlug(alias) === id,
    ),
  );
  const lineups = playerLineups(
    profile?.name ?? id.replaceAll("-", " "),
    profile?.aliases,
  );
  const playerName =
    profile?.name ??
    lineups[0]?.listedName ??
    id.replaceAll("-", " ").toUpperCase();
  const currentTeam = profile?.currentTeam ?? lineups[0]?.teamName;
  const team = teams.find(
    (entry) =>
      currentTeam && normalizedName(entry.name) === normalizedName(currentTeam),
  );
  if (!loaded) return <PageLoading />;
  if (!profile && !lineups.length)
    return (
      <EmptyPage
        title="Player profile not found"
        description="This player is not in the registered lineups currently tracked by CORE."
      />
    );
  return (
    <div className="page-content profile-page">
      <Link to={team ? `/teams/${team.id}` : "/teams"} className="back-link">
        <ChevronLeft size={16} />
        {team ? `Back to ${team.name}` : "All teams"}
      </Link>
      <PageHeader
        eyebrow={`${profile?.nationality ?? "PLAYER"} · ${profile?.role ?? lineups[0]?.position ?? "COMPETITIVE PLAYER"}`}
        title={playerName}
        description={`${currentTeam ?? lineups[0]?.teamName ?? "Registered esports player"} · individual player profile`}
      />
      <div className="player-hero card">
        <div className="player-avatar">
          {playerName.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <small>PLAYER PROFILE</small>
          <h2>{playerName}</h2>
          <p>
            {profile?.nationality ?? "India"} ·{" "}
            {profile?.role ?? "Roster player"} ·{" "}
            {currentTeam ?? lineups[0]?.teamName}
            {profile?.born ? ` · Born ${profile.born}` : ""}
          </p>
        </div>
        {team && (
          <Link className="button button-secondary" to={`/teams/${team.id}`}>
            Team profile <ArrowUpRight size={14} />
          </Link>
        )}
      </div>
      {profile?.kieRanking && (
        <>
          <SectionHeading
            title="KIE player ranking"
            action={
              <span className="result-count">Latest listed snapshot</span>
            }
          />
          <div className="player-stat-grid kie-player-stat-grid">
            <Card>
              <small>KIE RANK</small>
              <b>#{profile.kieRanking.rank}</b>
              <span>Decay-adjusted leaderboard position</span>
            </Card>
            <Card>
              <small>KIE POINTS</small>
              <b>{profile.kieRanking.points.toLocaleString()}</b>
              <span>Current ranking points</span>
            </Card>
            <Card>
              <small>KIE ELIMS</small>
              <b>{profile.kieRanking.eliminations.toLocaleString()}</b>
              <span>Eliminations on the ranking board</span>
            </Card>
            <Card>
              <small>RANK MOVEMENT</small>
              <b>{profile.kieRanking.change}</b>
              <span>Since prior snapshot</span>
            </Card>
          </div>
        </>
      )}
      {profile?.stats ? (
        <>
          <SectionHeading
            title="Career stats"
            action={<span className="result-count">Career hitboard</span>}
          />
          <div className="player-stat-grid">
            <Card>
              <small>TOTAL FINISHES</small>
              <b>{profile.stats.totalFinishes.toLocaleString()}</b>
              <span>Tracked across listed matches</span>
            </Card>
            <Card>
              <small>MATCHES</small>
              <b>{profile.stats.matches.toLocaleString()}</b>
              <span>Career hitboard</span>
            </Card>
            <Card>
              <small>FINISHES PER MATCH</small>
              <b>{profile.stats.finishesPerMatch.toFixed(2)}</b>
              <span>Overall rate</span>
            </Card>
            <Card>
              <small>FINALS FINISHES</small>
              <b>{profile.stats.finalsFinishes.toLocaleString()}</b>
              <span>Finishes in finals</span>
            </Card>
          </div>
          {profile.hitboardSplit && (
            <Card className="hitboard-splits">
              <div>
                <small>BGIS</small>
                <b>{profile.hitboardSplit.bgis}</b>
              </div>
              <div>
                <small>BMPS</small>
                <b>{profile.hitboardSplit.bmps}</b>
              </div>
              <div>
                <small>BMSD</small>
                <b>{profile.hitboardSplit.bmsd}</b>
              </div>
              <div>
                <small>GLOBAL & INTERNATIONAL</small>
                <b>{profile.hitboardSplit.global ?? "—"}</b>
              </div>
              <p>Finishes by competition group on the official hitboard.</p>
            </Card>
          )}
        </>
      ) : (
        <>
          <SectionHeading title="Career stats" />
          <Card className="profile-note-card">
            <p>
              This player is included in the KIE ranking, but does not appear on
              the currently published global career hitboard. Career totals are
              not shown to avoid mixing event-only stats with career totals.
            </p>
          </Card>
        </>
      )}
      {profile?.eventStats?.length ? (
        <>
          <SectionHeading
            title="Tournament statistics"
            action={
              <span className="result-count">
                Event data · not career totals
              </span>
            }
          />
          <Card className="profile-results">
            <div
              className="player-history-scroll"
              data-horizontal-scroll="true"
            >
              <table className="player-history-table event-stats-table">
                <thead>
                  <tr>
                    <th>Tournament</th>
                    <th>Stage</th>
                    <th>Matches</th>
                    <th>Finishes</th>
                    <th>FPM</th>
                    <th>Knocks</th>
                    <th>Headshots</th>
                    <th>Grenade finishes</th>
                    <th>Powerplay finishes</th>
                    <th>Avg survival</th>
                    <th>Team contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.eventStats.map((stat) => (
                    <tr key={`${stat.event}-${stat.stage}`}>
                      <td>
                        <b>{stat.event}</b>
                      </td>
                      <td>{stat.stage}</td>
                      <td>{stat.matches}</td>
                      <td>{stat.finishes}</td>
                      <td>{stat.fpm.toFixed(2)}</td>
                      <td>{stat.knocks ?? "—"}</td>
                      <td>{stat.headshots ?? "—"}</td>
                      <td>{stat.grenadeFinishes ?? "—"}</td>
                      <td>{stat.powerplayFinishes ?? "—"}</td>
                      <td>
                        {stat.avgSurvivalSeconds
                          ? `${Math.floor(stat.avgSurvivalSeconds / 60)}:${String(stat.avgSurvivalSeconds % 60).padStart(2, "0")}`
                          : "—"}
                      </td>
                      <td>{stat.teamContribution ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : null}
      <SectionHeading
        title="Achievements"
        action={
          <span className="result-count">
            {profile?.results?.length
              ? `${profile.results.length} results`
              : "Team results are labelled"}
          </span>
        }
      />
      {profile?.results?.length ? (
        <Card className="profile-results">
          <div className="player-history-scroll" data-horizontal-scroll="true">
            <table className="player-history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Place</th>
                  <th>Tier</th>
                  <th>Tournament</th>
                  <th>Team</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                {profile.results.map((result) => (
                  <tr key={`${result.date}-${result.event}`}>
                    <td>{result.date}</td>
                    <td>
                      <b>{result.place}</b>
                    </td>
                    <td>{result.tier}</td>
                    <td>{result.event}</td>
                    <td>{result.team}</td>
                    <td>{result.prize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : profile?.achievements.length ? (
        <Card className="profile-results">
          {profile.achievements.map((achievement, index) => (
            <div
              className="profile-result-row profile-achievement"
              key={`${achievement.event}-${achievement.year}-${index}`}
            >
              <span className="profile-result-rank">
                <Trophy size={15} />
              </span>
              <span>
                <b>
                  {achievement.title} · {achievement.event}
                </b>
                <small>
                  {achievement.year}
                  {achievement.detail ? ` · ${achievement.detail}` : ""}
                </small>
              </span>
              <em>{achievement.distinction ?? "Team result"}</em>
            </div>
          ))}
        </Card>
      ) : (
        <Card className="profile-note-card">
          <p>
            No tournament result rows are currently loaded for this player. The
            KIE leaderboard record and rank movement above are available for
            this profile.
          </p>
        </Card>
      )}
      {profile?.awards?.length ? (
        <>
          <SectionHeading
            title="Awards"
            action={
              <span className="result-count">
                {profile.awards.length} awards
              </span>
            }
          />
          <Card className="profile-results">
            <div
              className="player-history-scroll"
              data-horizontal-scroll="true"
            >
              <table className="player-history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Award</th>
                    <th>Tier</th>
                    <th>Tournament</th>
                    <th>Team</th>
                    <th>Prize</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.awards.map((award) => (
                    <tr key={`${award.date}-${award.event}-${award.award}`}>
                      <td>{award.date}</td>
                      <td>
                        <b>{award.award}</b>
                      </td>
                      <td>{award.tier}</td>
                      <td>{award.event}</td>
                      <td>{award.team}</td>
                      <td>{award.prize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : null}
      {profile?.history?.length ? (
        <>
          <SectionHeading title="Team history" />
          <Card className="profile-results">
            <div
              className="player-history-scroll"
              data-horizontal-scroll="true"
            >
              <table className="player-history-table">
                <thead>
                  <tr>
                    <th>Joined</th>
                    <th>Left</th>
                    <th>Team</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.history.map((entry) => (
                    <tr key={`${entry.join}-${entry.team}`}>
                      <td>{entry.join}</td>
                      <td>{entry.leave}</td>
                      <td>
                        <b>{entry.team}</b>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : null}
      {lineups.length > 0 && (
        <>
          <SectionHeading title="Registered lineups" />
          <Card className="profile-results">
            {lineups.map(({ event, teamName, position, roster }) => (
              <Link
                className="profile-result-row"
                to={`/tournaments/${event.id}`}
                key={`${event.id}-${teamName}`}
              >
                <span className="profile-result-rank">
                  <Users size={15} />
                </span>
                <span>
                  <b>{teamName}</b>
                  <small>
                    {event.name} · {position}
                    {roster.captain?.toLowerCase() === playerName.toLowerCase()
                      ? " · Captain"
                      : ""}
                  </small>
                </span>
                <ChevronRight size={16} />
              </Link>
            ))}
          </Card>
        </>
      )}
    </div>
  );
}

function RankingsPage() {
  const [rankingsLoaded, setRankingsLoaded] = useState(false);
  const [teamRankingRows, setTeamRankingRows] = useState<
    typeof import("./data/rankings").kieTeamRankings
  >([]);
  const [playerRankingRows, setPlayerRankingRows] = useState<
    typeof import("./data/rankings").kiePlayerRankings
  >([]);
  useEffect(() => {
    let active = true;
    void import("./data/rankings").then((data) => {
      if (!active) return;
      setTeamRankingRows(data.kieTeamRankings);
      setPlayerRankingRows(data.kiePlayerRankings);
      setRankingsLoaded(true);
    });
    return () => {
      active = false;
    };
  }, []);
  const [board, setBoard] = useState<"teams" | "players">("teams");
  const [limit, setLimit] = useState<10 | 25 | 50>(50);
  const [query, setQuery] = useState("");
  const isTeams = board === "teams";
  const term = query.trim().toLowerCase();
  const { profiles: playerProfiles } = usePlayerProfiles();
  const teamRows = teamRankingRows
    .filter((row) => !term || row.name.toLowerCase().includes(term))
    .slice(0, limit);
  const playerRows = playerRankingRows
    .filter(
      (row) => !term || `${row.name} ${row.team}`.toLowerCase().includes(term),
    )
    .slice(0, limit);
  const shownCount = isTeams ? teamRows.length : playerRows.length;
  const total = isTeams
    ? kieRankingsSnapshot.teamsTotal
    : kieRankingsSnapshot.playersTotal;
  const updated = isTeams
    ? kieRankingsSnapshot.teamDate
    : kieRankingsSnapshot.playerDate;
  const sourceUrl = `https://esportsamaze.com/bgmi/rankings?board=${board}`;
  if (!rankingsLoaded) return <PageLoading />;
  return (
    <div className="page-content">
      <PageHeader
        eyebrow="KRAFTON INDIA ESPORTS · BGMI"
        title="Rankings"
        description="Official KIE team standings and player rankings, ordered by decay-adjusted points."
      />
      <div className="ranking-summary">
        <Card>
          <span className="summary-icon">
            <Trophy size={18} />
          </span>
          <small>TEAM LEADERBOARD</small>
          <b>{kieRankingsSnapshot.teamsTotal}</b>
          <span>Ranked teams</span>
        </Card>
        <Card>
          <span className="summary-icon">
            <Activity size={18} />
          </span>
          <small>PLAYER LEADERBOARD</small>
          <b>{kieRankingsSnapshot.playersTotal}</b>
          <span>Ranked players</span>
        </Card>
        <Card>
          <span className="summary-icon">
            <CalendarDays size={18} />
          </span>
          <small>SELECTED BOARD UPDATED</small>
          <b>{updated}</b>
          <span>Rolling points snapshot</span>
        </Card>
      </div>
      <div className="rankings-toolbar">
        <div
          className="filter-tabs rankings-board-tabs"
          aria-label="Choose rankings board"
        >
          <button
            className={isTeams ? "selected" : ""}
            onClick={() => {
              setBoard("teams");
              setQuery("");
            }}
          >
            KIE team leaderboard
          </button>
          <button
            className={!isTeams ? "selected" : ""}
            onClick={() => {
              setBoard("players");
              setQuery("");
            }}
          >
            Player rankings
          </button>
        </div>
        <label className="rankings-search">
          <Search size={15} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={isTeams ? "Search teams" : "Search players or teams"}
            aria-label={isTeams ? "Search teams" : "Search players or teams"}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </label>
      </div>
      <Card className="ranking-table-card">
        <div className="ranking-table-header">
          <div>
            <h2>{isTeams ? "KIE team leaderboard" : "KIE player rankings"}</h2>
            <p>Decay-adjusted standings · snapshot {updated}</p>
          </div>
          <span className="source-tag">
            {isTeams ? "TEAM POINTS" : "PLAYER POINTS"}
          </span>
        </div>
        <div
          className="ranking-range-tabs"
          aria-label="Number of rankings to show"
        >
          {([10, 25, 50] as const).map((count) => (
            <button
              key={count}
              onClick={() => setLimit(count)}
              className={limit === count ? "active" : ""}
            >
              Top {count}
            </button>
          ))}
        </div>
        {isTeams ? (
          <div className="table-scroll" data-horizontal-scroll>
            <table className="kie-ranking-table kie-team-table">
              <thead>
                <tr>
                  <th>RANK</th>
                  <th>TEAM</th>
                  <th>EVENTS</th>
                  <th>CHANGE</th>
                  <th className="align-right">KIE POINTS</th>
                </tr>
              </thead>
              <tbody>
                {teamRows.map((row) => {
                  const team = teams.find(
                    (entry) =>
                      normalizedName(entry.name) === normalizedName(row.name),
                  );
                  const name = (
                    <>
                      <TeamLogoBadge
                        name={row.name}
                        logoUrl={team?.logoUrl}
                        initials={row.name
                          .split(/\s+/)
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                        size="small"
                      />
                      <b>{row.name}</b>
                    </>
                  );
                  return (
                    <tr key={row.rank}>
                      <td>
                        <span
                          className={`table-rank${row.rank <= 3 ? " top-rank" : ""}`}
                        >
                          {String(row.rank).padStart(2, "0")}
                        </span>
                      </td>
                      <td>
                        {team ? (
                          <Link className="table-team" to={`/teams/${team.id}`}>
                            {name}
                          </Link>
                        ) : (
                          <span className="table-team">{name}</span>
                        )}
                      </td>
                      <td>{row.events ?? "—"}</td>
                      <td>
                        <span className="ranking-trend">{row.change}</span>
                      </td>
                      <td className="align-right points-cell">
                        {row.points.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="table-scroll" data-horizontal-scroll>
            <table className="kie-ranking-table kie-player-table">
              <thead>
                <tr>
                  <th>RANK</th>
                  <th>PLAYER</th>
                  <th>TEAM</th>
                  <th>ELIMS</th>
                  <th>CHANGE</th>
                  <th className="align-right">KIE POINTS</th>
                </tr>
              </thead>
              <tbody>
                {playerRows.map((row) => {
                  const profile = playerProfiles.find((entry) =>
                    [entry.name, ...entry.aliases].some(
                      (alias) =>
                        normalizedName(alias) === normalizedName(row.name),
                    ),
                  );
                  const hasLineup = playerLineups(row.name).length > 0;
                  const name = (
                    <>
                      <b>{row.name}</b>
                      <small className="ranking-mobile-team">{row.team}</small>
                    </>
                  );
                  return (
                    <tr key={row.rank}>
                      <td>
                        <span
                          className={`table-rank${row.rank <= 3 ? " top-rank" : ""}`}
                        >
                          {String(row.rank).padStart(2, "0")}
                        </span>
                      </td>
                      <td>
                        {profile || hasLineup ? (
                          <Link
                            className="ranking-player-link"
                            to={`/players/${playerSlug(profile?.name ?? row.name)}`}
                          >
                            {name}
                          </Link>
                        ) : (
                          <span className="ranking-player-link">{name}</span>
                        )}
                      </td>
                      <td>{row.team}</td>
                      <td>{row.eliminations}</td>
                      <td>
                        <span className="ranking-trend">{row.change}</span>
                      </td>
                      <td className="align-right points-cell">
                        {row.points.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="table-footer">
          Showing {shownCount} of {total} ranked {isTeams ? "teams" : "players"}{" "}
          · displayed rows are the available top 50 snapshot
          <span>
            <a href={sourceUrl} target="_blank" rel="noreferrer">
              Open full leaderboard <ArrowUpRight size={12} />
            </a>
          </span>
        </div>
      </Card>
    </div>
  );
}

function NewsPage() {
  const [category, setCategory] = useState("All stories");
  const filters = ["All stories", "BGMI", "Multi-game", "Results"];
  const filtered = articles.filter(
    (article) =>
      category === "All stories" ||
      (category === "BGMI"
        ? article.category.includes("BGMI")
        : category === "Multi-game"
          ? article.category.includes("MULTI-GAME")
          : article.category.includes("RESULTS")),
  );
  const [featured, ...more] = filtered;
  return (
    <div className="page-content">
      <PageHeader
        eyebrow="THE LATEST FROM THE SCENE"
        title="News & stories"
        description="Tournament results, industry updates and stories from across esports."
      />
      <DataNotice />
      <div className="filter-tabs news-tabs">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={category === item ? "selected" : ""}
          >
            {item}
          </button>
        ))}
      </div>
      {featured ? (
        <Card className="featured-story">
          <div className="featured-image">
            <span className="featured-image-icon">
              <Newspaper size={38} />
            </span>
            <span className="image-caption">
              CORE ESPORTS · {featured.category}
            </span>
          </div>
          <div className="featured-content">
            <span className="story-category">{featured.category}</span>
            <Link to={`/news/${featured.id}`}>
              <h2>{featured.title}</h2>
            </Link>
            <p>{featured.summary}</p>
            <span className="story-meta">
              {featured.date} <i /> {featured.readTime}
            </span>
            <div className="featured-actions">
              <Link className="text-link" to={`/news/${featured.id}`}>
                Read full story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="empty-state">
          <b>No stories in this category</b>
          <p>Choose another filter to browse available stories.</p>
        </Card>
      )}
      <SectionHeading
        title="More stories"
        action={<span className="result-count">{filtered.length} stories</span>}
      />
      <div className="news-grid">
        {more.map((article) => (
          <Card key={article.id} className="news-card-full">
            <div className="news-thumb">
              <Newspaper size={22} />
            </div>
            <span className="story-category">{article.category}</span>
            <Link to={`/news/${article.id}`}>
              <h3>{article.title}</h3>
            </Link>
            <p>{article.summary}</p>
            <span className="story-meta">
              {article.date} <i /> {article.readTime}
            </span>
            <Link className="text-link" to={`/news/${article.id}`}>
              Read story <ArrowRight size={13} />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ArticleDetail() {
  const { id = "" } = useParams();
  const article = articles.find((entry) => entry.id === id);
  if (!article)
    return (
      <EmptyPage
        title="Story not found"
        description="This article isn’t available."
      />
    );
  const sections: Record<string, { heading: string; text: string }[]> = {
    "google-play-arena-launch": [
      {
        heading: "A new multi-game competition",
        text: "Google Play and NODWIN Gaming have introduced Google Play Arena, a multi-phase esports competition built around a range of mobile and casual titles. The programme is designed to give players a clear route from open participation into organized competition.",
      },
      {
        heading: "A team led by MS Dhoni",
        text: "The launch also introduced Mahi Clutchers, a grassroots team associated with MS Dhoni. Its presence gives the competition a recognizable face while keeping the focus on players and community participation.",
      },
      {
        heading: "Games and participation",
        text: "The announced lineup spans BGMI, Free Fire MAX, Real Cricket, Chess and EA SPORTS FC Mobile. Open registration lets players enter the relevant game pathways and compete through the tournament phases.",
      },
      {
        heading: "What to watch next",
        text: "The format connects community entry points with later stages of competition. Players can follow the in-app event calendar for the BGMI schedule and the tournament page for updates as details are announced.",
      },
    ],
    "bgmi-survivor-league": [
      {
        heading: "A month-long creator competition",
        text: "KRAFTON India’s BGMI Survivor League is a 30-day programme running through November 17, 2026. It pairs participating creators with fans in a shared competition built around regular play and in-game objectives.",
      },
      {
        heading: "Fans influence the leaderboard",
        text: "Players join a creator and collect points through daily activity and missions. Those points contribute to the creator standings, giving fans a direct role in how the league develops over the month.",
      },
      {
        heading: "Prize pool and format",
        text: "The announced prize pool is ₹70 lakh. The league emphasizes consistent participation: progress is measured across the full run rather than a single match day.",
      },
      {
        heading: "Why it matters",
        text: "The format brings community participation closer to the competitive scene. It gives casual players a shared objective with creators and makes the leaderboard part of the experience.",
      },
    ],
    "bmic-international": [
      {
        heading: "Three regions on one stage",
        text: "The 2026 BGMI International Cup brought 16 teams from India, South Korea and Japan to Mumbai for a LAN competition. The international field gave domestic teams a chance to measure themselves against established regional opponents.",
      },
      {
        heading: "A ₹1 crore event with global stakes",
        text: "Alongside the ₹1 crore prize pool, qualification opportunities for the PUBG Mobile Global Championship added significance to the final standings. Each placement carried both a financial reward and a possible route to the season’s global stage.",
      },
      {
        heading: "Nongshim Redforce take the title",
        text: "Nongshim Redforce finished first with 233 points. DRX placed second on 151, followed by Dplus on 149, completing a close chase for the remaining podium positions.",
      },
      {
        heading: "The season continues",
        text: "With the Mumbai event complete, attention turns to the remaining international calendar and the teams that will secure places at the year-end championship.",
      },
    ],
    "ewc-qualifiers-2027": [
      {
        heading: "A wider route into the 2027 season",
        text: "The Esports World Cup has announced a qualifier programme for 2027 that connects established competitive circuits with local organizers and community events.",
      },
      {
        heading: "Local events, global opportunity",
        text: "The Road to EWC structure is intended to broaden access to the global championship. Regional competitions can serve as entry points, while existing circuits retain a role in identifying top-level teams.",
      },
      {
        heading: "Building the calendar",
        text: "The programme is expected to involve hundreds of events and a large international player base. Individual game schedules and qualification rules will define how teams advance as the season approaches.",
      },
      {
        heading: "What teams should follow",
        text: "Teams and organizers can watch for title-specific rules, regional dates and qualification slots. Those details will turn the broad pathway into concrete routes for each competitive community.",
      },
    ],
    "soul-bmsd-champions": [
      {
        heading: "A comeback on finals day",
        text: "Team SouL closed the Battlegrounds Mobile India Showdown 2026 with 155 points after recovering from a 28-point deficit on the final day. The late surge put the team at the top of a tightly contested Grand Finals.",
      },
      {
        heading: "Gladiators and 8BIT complete the podium",
        text: "Gladiators Esports finished second with 141 points, while Team 8BIT took third on 140. The narrow gap between the final two podium places reflected how quickly the leaderboard shifted across the closing matches.",
      },
      {
        heading: "LEGIT earns Finals MVP",
        text: "SouL player LEGIT was named Finals MVP for his performance during the championship run. The individual award capped a strong team finish and highlighted the impact of the final-day push.",
      },
      {
        heading: "Global qualification secured",
        text: "The title also secured global qualification opportunities for Team SouL. The squad now carries its domestic form into the next stage of the international season.",
      },
    ],
  };
  const storySections = sections[article.id] ?? [];
  const related = articles
    .filter((entry) => entry.id !== article.id)
    .slice(0, 2);
  return (
    <div className="page-content article-detail">
      <Link to="/news" className="back-link">
        <ChevronLeft size={16} />
        All stories
      </Link>
      <span className="story-category">{article.category}</span>
      <h1>{article.title}</h1>
      <div className="story-meta">
        {article.date} <i /> {article.readTime}
      </div>
      <div className="article-cover">
        <Newspaper size={42} />
        <span>CORE ESPORTS · {article.category}</span>
      </div>
      <p className="article-lead">{article.summary}</p>
      <div className="article-body">
        {storySections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
      <Card className="article-takeaway">
        <span className="card-overline">THE TAKEAWAY</span>
        <p>{article.summary}</p>
        <Link className="text-link" to="/tournaments">
          Explore tournaments <ArrowRight size={14} />
        </Link>
      </Card>
      <SectionHeading title="More stories" />
      <div className="news-grid">
        {related.map((entry) => (
          <Card key={entry.id} className="news-card-full">
            <span className="story-category">{entry.category}</span>
            <Link to={`/news/${entry.id}`}>
              <h3>{entry.title}</h3>
            </Link>
            <p>{entry.summary}</p>
            <Link className="text-link" to={`/news/${entry.id}`}>
              Read story <ArrowRight size={13} />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

function eventOccursOnDay(event: Event, day: number, month: number) {
  const numbers = event.day.match(/\d+/g)?.map(Number) ?? [];
  const start = numbers[0];
  const end = numbers[1] ?? start;
  if (!start) return false;
  if (month === 10)
    return (
      event.month.includes("NOV") &&
      day >= start &&
      (event.month.includes("DEC") ? day <= 30 : day <= end)
    );
  return (
    event.month.includes("DEC") &&
    (end < start ? day >= 1 && day <= end : day >= start && day <= end)
  );
}
function CalendarPage() {
  const [month, setMonth] = useState(10);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const monthName = month === 10 ? "November 2026" : "December 2026";
  const monthEvents = events.filter((event) =>
    month === 10 ? event.month.includes("NOV") : event.month.includes("DEC"),
  );
  const visibleEvents =
    selectedDay === null
      ? monthEvents
      : monthEvents.filter((event) =>
          eventOccursOnDay(event, selectedDay, month),
        );
  return (
    <div className="page-content">
      <PageHeader
        eyebrow="PLAN YOUR SEASON"
        title="Event calendar"
        description="Browse upcoming BGMI and PUBG Mobile dates and open any event for details."
      />
      <DataNotice />
      <Card className="calendar-card">
        <div className="calendar-head">
          <button
            className="icon-button"
            onClick={() => {
              setMonth(10);
              setSelectedDay(null);
            }}
            disabled={month === 10}
            aria-label="Previous month"
          >
            <ChevronLeft size={19} />
          </button>
          <h2>{monthName}</h2>
          <button
            className="icon-button"
            onClick={() => {
              setMonth(11);
              setSelectedDay(null);
            }}
            disabled={month === 11}
            aria-label="Next month"
          >
            <ChevronRight size={19} />
          </button>
        </div>
        <div className="calendar-weekdays">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="calendar-grid">
          {Array.from({ length: 42 }, (_, index) => {
            const offset = month === 10 ? 6 : 1;
            const lastDay = month === 10 ? 30 : 31;
            const date = index - offset + 1;
            const shown = date > 0 && date <= lastDay;
            const dayHasEvent =
              shown &&
              monthEvents.some((event) => eventOccursOnDay(event, date, month));
            const selected = shown && selectedDay === date;
            return (
              <button
                key={index}
                className={`${shown ? "" : "outside"}${selected ? " selected-day" : ""}${dayHasEvent ? " has-event" : ""}`}
                disabled={!shown}
                aria-pressed={selected}
                aria-label={
                  shown
                    ? `${monthName.split(" ")[0]} ${date}${dayHasEvent ? ", scheduled events" : ""}`
                    : undefined
                }
                onClick={() => shown && setSelectedDay(selected ? null : date)}
              >
                {shown
                  ? date
                  : date <= 0
                    ? month === 10
                      ? 31 + date
                      : 30 + date
                    : date - lastDay}
              </button>
            );
          })}
        </div>
        <div className="calendar-legend">
          <i /> Dates with scheduled events · select a day to filter
        </div>
      </Card>
      <SectionHeading
        title={
          selectedDay === null
            ? "This month"
            : `Events on ${monthName.split(" ")[0]} ${selectedDay}`
        }
        action={
          selectedDay !== null ? (
            <button
              className="text-link calendar-clear"
              onClick={() => setSelectedDay(null)}
            >
              Clear date
            </button>
          ) : (
            <span className="result-count">{monthName}</span>
          )
        }
      />
      {visibleEvents.length ? (
        <EventList items={visibleEvents} />
      ) : (
        <Card className="empty-state">
          <b>No events on this date</b>
          <p>Choose a marked date to see its tournament schedule.</p>
        </Card>
      )}
    </div>
  );
}

function SearchPage({
  query,
  onQueryChange,
  favorites,
  toggleFavorite,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}) {
  const { profiles: playerProfiles, loaded: playersLoaded } =
    usePlayerProfiles();
  const result = useMemo(() => {
    const value = query.trim().toLowerCase();
    return {
      tournamentResults: tournaments.filter((item) =>
        `${item.name} ${item.editionLabel ?? ""} ${item.archiveSeries ?? ""} ${item.game} ${item.date} ${item.location}`
          .toLowerCase()
          .includes(value),
      ),
      teamResults: teams.filter((item) =>
        `${item.name} ${item.game} ${item.region}`
          .toLowerCase()
          .includes(value),
      ),
      playerResults: playerProfiles.filter((item) =>
        `${item.name} ${item.aliases.join(" ")} ${item.currentTeam} ${item.role}`
          .toLowerCase()
          .includes(value),
      ),
      articleResults: articles.filter((item) =>
        `${item.title} ${item.category} ${item.summary}`
          .toLowerCase()
          .includes(value),
      ),
    };
  }, [query, playerProfiles]);
  return (
    <div className="page-content">
      <PageHeader
        eyebrow="EXPLORE CORE"
        title="Search"
        description="Find tournaments, teams, players and stories."
      />
      <label className="search-large">
        <Search size={20} />
        <input
          autoFocus
          aria-label="Search tournaments, teams, players, and news"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search events, teams, players, news..."
        />
        <kbd>ESC</kbd>
      </label>
      {!query.trim() ? (
        <Card className="empty-state">
          <Search size={25} />
          <b>What are you looking for?</b>
          <p>Try an event, team or player name.</p>
        </Card>
      ) : (
        <div className="search-results">
          <span className="result-count">Results for “{query}”</span>
          {result.tournamentResults.length > 0 && (
            <>
              <SectionHeading title="Tournaments" />
              <div className="tournament-grid">
                {result.tournamentResults.map((item) => (
                  <TournamentCard
                    key={item.id}
                    item={item}
                    favorite={favorites.includes(item.id)}
                    onFavorite={() => toggleFavorite(item.id)}
                  />
                ))}
              </div>
            </>
          )}
          {result.teamResults.length > 0 && (
            <>
              <SectionHeading title="Teams" />
              <div className="team-grid">
                {result.teamResults.map((team, i) => (
                  <TeamCard key={team.id} team={team} rank={i + 1} />
                ))}
              </div>
            </>
          )}
          {result.playerResults.length > 0 && (
            <>
              <SectionHeading title="Players" />
              <div className="player-search-grid">
                {result.playerResults.map((player) => (
                  <Link
                    className="profile-player-card"
                    to={`/players/${player.id}`}
                    key={player.id}
                  >
                    <span className="profile-player-initials">
                      {player.name.slice(0, 2)}
                    </span>
                    <span>
                      <b>{player.name}</b>
                      <small>
                        {player.currentTeam} · {player.role}
                      </small>
                    </span>
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            </>
          )}
          {result.articleResults.length > 0 && (
            <>
              <SectionHeading title="News" />
              <Card>
                {result.articleResults.map((article) => (
                  <ArticleRow key={article.id} article={article} />
                ))}
              </Card>
            </>
          )}
          {result.tournamentResults.length +
            result.teamResults.length +
            result.playerResults.length +
            result.articleResults.length ===
            0 &&
            playersLoaded && (
              <EmptyPage
                title="No results found"
                description="Try another search term."
              />
            )}
          {result.tournamentResults.length +
            result.teamResults.length +
            result.playerResults.length +
            result.articleResults.length ===
            0 &&
            !playersLoaded && <PageLoading />}
        </div>
      )}
    </div>
  );
}

function FavoritesPage({
  favorites,
  toggleFavorite,
}: {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}) {
  const saved = tournaments.filter((item) => favorites.includes(item.id));
  return (
    <div className="page-content">
      <PageHeader
        eyebrow="YOUR COLLECTION"
        title="Favorites"
        description="The tournaments you’re keeping an eye on."
      />
      {saved.length ? (
        <div className="tournament-grid">
          {saved.map((item) => (
            <TournamentCard
              key={item.id}
              item={item}
              favorite
              onFavorite={() => toggleFavorite(item.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyPage
          title="No favorites yet"
          description="Save a tournament with the heart icon and it’ll be easy to find here."
        />
      )}
    </div>
  );
}

function EmptyPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="empty-state">
      <span className="empty-icon">
        <Crown size={22} />
      </span>
      <b>{title}</b>
      <p>{description}</p>
      <Link className="button button-primary" to="/">
        Back to home
        <ArrowRight size={15} />
      </Link>
    </Card>
  );
}

function NotFoundPage() {
  return (
    <div className="page-content not-found-page">
      <div className="not-found-code">404</div>
      <PageHeader
        eyebrow="PAGE NOT FOUND"
        title="We can’t find that page"
        description="The address may be out of date, or the page may have moved."
      />
      <div className="not-found-actions">
        <Link className="button button-primary" to="/">
          Back to home
          <ArrowRight size={15} />
        </Link>
        <Link className="button button-secondary" to="/tournaments">
          Browse tournaments
        </Link>
      </div>
    </div>
  );
}

export default App;
