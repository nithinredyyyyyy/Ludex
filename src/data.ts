export type TournamentStatus = "Live now" | "Upcoming" | "Completed";
export type Tournament = {
  id: string;
  name: string;
  editionLabel?: string;
  archiveSeries?: string;
  archiveYear?: string;
  isArchiveEdition?: boolean;
  game: string;
  date: string;
  location: string;
  prize: string;
  status: TournamentStatus;
  color: string;
  sourceUrl: string;
  sourceLabel: string;
  asOf?: string;
  referenceUrls?: string[];
  teams?: number;
  tier?: string;
  winner?: string;
  runnerUp?: string;
  points?: number;
  description: string;
  mark: string;
  logoUrl?: string;
  organizer: string;
  format: string;
  formatDetail: string;
  broadcast: string;
  stages?: number;
  matches?: number;
  thirdPlace?: string;
  season?: string;
  competitionMode?: string;
  eventType?: string;
  confirmedTeams?: number;
};
export type Team = {
  id: string;
  name: string;
  game: string;
  region: string;
  points: number;
  rank: number;
  trend: string;
  initials: string;
  accent: string;
  highlights: string[];
  logoUrl?: string;
};
export type Article = {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  sourceUrl: string;
  sourceLabel: string;
};
export type Event = {
  id: string;
  day: string;
  month: string;
  title: string;
  meta: string;
  sourceUrl: string;
};
export type TournamentStanding = {
  rank: number;
  name: string;
  points?: number;
  wins?: number;
  placementPoints?: number;
  eliminations?: number;
};
export type TournamentPrize = { place: string; amount: string };
export type TournamentParticipant = {
  name: string;
  route?: string;
  logoUrl?: string;
};
export type TournamentRoster = {
  players: string[];
  substitutes?: string[];
  captain?: string;
};

export const dataCheckedAt = "Nov 5, 2026";
export const rankingUpdatedAt = "Oct 18, 2026";

const amaze = "https://esportsamaze.com";
const esportStats = "https://esportstats.in";
const charts = "https://escharts.com/upcoming-tournaments/bgmi";
const liquipedia = "https://liquipedia.net/pubgmobile";

export const sourceUrls = { amaze, esportStats, charts, liquipedia };

export const sourceLinks = [
  {
    label: "eSportsAmaze",
    url: `${amaze}/bgmi/tournaments/chennai-esports-global-championship-2026`,
  },
  { label: "eSportStats", url: `${esportStats}/` },
  { label: "Esports Charts", url: charts },
  { label: "Liquipedia", url: `${liquipedia}/Battlegrounds_Mobile_India` },
];

export const tournaments: Tournament[] = [
  {
    id: "cegc-2026",
    name: "Chennai Esports Global Championship 2026",
    game: "BGMI",
    date: "Nov 3 – Dec 13, 2026",
    location: "Chennai, India",
    prize: "₹75,00,000",
    status: "Live now",
    asOf: "Nov 6, 2026, 4:00:10 PM IST (snapshot; exact source capture time observed in browser)",
    color: "rose",
    mark: "CEGC",
    logoUrl: "/assets/tournaments/cegc-2026.webp",
    organizer: "Skyesports · Sports Development Authority of Tamil Nadu",
    format: "32-team hybrid · 6 stages",
    formatDetail:
      "Thirty-two squads play Group Stage 1 across two groups. The top eight advance to the Upper Bracket; the other 24 play Group Stage 2. Upper and Lower Brackets feed the Last Chance Qualifier, which completes the 16-team Grand Finals field.",
    broadcast: "Skyesports · Kick",
    sourceUrl: `${amaze}/bgmi/tournaments/chennai-esports-global-championship-2026`,
    sourceLabel: "Event listing",
    teams: 32,
    tier: "B-Tier",
    stages: 6,
    matches: 27,
    season: "2026",
    competitionMode: "Squads TPP",
    eventType: "Hybrid",
    description:
      "The Chennai Esports Global Championship 2026 is underway in Chennai. The 32-team BGMI event runs from November 3 to December 13, with a ₹75 lakh prize pool and six stages. Group Stage 1 is in progress; the 16-team LAN Grand Finals are scheduled for December 11–13.",
  },
  {
    id: "cegc-2025",
    name: "Chennai Esports Global Championship 2025",
    game: "BGMI",
    date: "Nov 14–16, 2025",
    location: "Jawaharlal Nehru Indoor Stadium, Chennai",
    prize: "₹50,00,000",
    status: "Completed",
    color: "rose",
    mark: "CEGC",
    logoUrl: "/assets/tournaments/cegc-2026.webp",
    editionLabel: "CEGC 2025",
    archiveSeries: "CEGC",
    archiveYear: "2025",
    isArchiveEdition: true,
    organizer: "Skyesports · Sports Development Authority of Tamil Nadu",
    format: "24-team semi-finals · 16-team Grand Finals · 5 stages",
    formatDetail:
      "The BGMI competition ran through open and closed qualifiers, semi-finals, a Last Chance Qualifier and a 16-team Grand Finals. The finals used the Smash Rule: Team SouL reached the match-point threshold and won Match 16. The 18-match finals ended after that win, with two matches unplayed.",
    broadcast: "Skyesports",
    sourceUrl: `${liquipedia}/Chennai_Esports_Global_Championship/2025`,
    sourceLabel: "Liquipedia",
    teams: 16,
    tier: "B-Tier",
    winner: "Team SouL",
    runnerUp: "True Rippers",
    thirdPlace: "Gods Reign",
    points: 162,
    stages: 5,
    matches: 16,
    season: "2025",
    competitionMode: "Squads TPP",
    eventType: "LAN",
    description:
      "The inaugural Chennai Esports Global Championship BGMI finals took place in Chennai from November 14–16, 2025. Team SouL won the ₹50 lakh event under the Smash Rule, with True Rippers second and Gods Reign third.",
  },
  {
    id: "pmgc-2026",
    name: "PUBG Mobile Global Championship 2026",
    game: "PUBG Mobile",
    date: "Nov 23 – Dec 13, 2026",
    location: "Turkey",
    prize: "$3,000,000",
    status: "Upcoming",
    color: "lavender",
    mark: "PMGC",
    logoUrl: "/assets/tournaments/pmgc-2026.webp",
    editionLabel: "PMGC 2026",
    archiveSeries: "PMGC",
    archiveYear: "2026",
    isArchiveEdition: true,
    organizer: "KRAFTON · Level Infinite",
    format: "39-team global championship",
    formatDetail:
      "The 2026 championship is scheduled for November–December in Istanbul. Detailed stage dates, match schedule and qualified teams are being updated.",
    broadcast: "Broadcast details to be announced",
    sourceUrl: `${liquipedia}/PUBG_Mobile_Global_Championship/2026`,
    sourceLabel: "Liquipedia",
    teams: 39,
    tier: "S-Tier",
    stages: 3,
    season: "2026",
    description:
      "The premier global PUBG Mobile championship brings the season’s top teams together in Turkey to compete for a $3 million prize pool.",
  },
  {
    id: "battlin-open-track-1",
    name: "Battlin Open Season 1 – Track 1",
    game: "BGMI",
    date: "Nov 15, 2026",
    location: "Venue pending confirmation",
    prize: "$5,267",
    status: "Upcoming",
    color: "blue",
    mark: "BO",
    logoUrl: "/assets/tournaments/battlin.png",
    organizer: "Battlin",
    format: "Open tournament track",
    formatDetail:
      "Track 1 of Battlin Open Season 1. Match schedule and qualification format to be announced.",
    broadcast: "Broadcast details to be announced",
    sourceUrl: charts,
    sourceLabel: "Esports Charts",
    description:
      "A standalone BGMI competition on the Battlin Open calendar. Venue and participating team details have not yet been announced.",
  },
  {
    id: "jioblast-gully-wars",
    name: "JioBLAST Gully Wars",
    game: "BGMI",
    date: "Nov 27–29, 2026",
    location: "Venue pending confirmation",
    prize: "$10,386",
    status: "Upcoming",
    color: "sand",
    mark: "GW",
    logoUrl: "/assets/tournaments/jio-blast.png",
    organizer: "Jio · BLAST",
    format: "BGMI tournament",
    formatDetail:
      "Competition format, participating teams and match schedule to be announced.",
    broadcast: "Broadcast details to be announced",
    sourceUrl: charts,
    sourceLabel: "Esports Charts",
    description:
      "A BGMI competition hosted under JioBLAST Gully Wars. Venue and participating team details have not yet been announced.",
  },
  {
    id: "battlin-open-track-2",
    name: "Battlin Open Season 1 – Track 2",
    game: "BGMI",
    date: "Nov 27–29, 2026",
    location: "Venue pending confirmation",
    prize: "$15,800",
    status: "Upcoming",
    color: "lavender",
    mark: "BO",
    logoUrl: "/assets/tournaments/battlin.png",
    organizer: "Battlin",
    format: "Open tournament track",
    formatDetail:
      "Track 2 of Battlin Open Season 1. Match schedule and qualification format to be announced.",
    broadcast: "Broadcast details to be announced",
    sourceUrl: charts,
    sourceLabel: "Esports Charts",
    description:
      "The second track of Battlin Open Season 1 gives BGMI teams another opportunity to compete. Venue and team details have not yet been announced.",
  },
  {
    id: "google-play-arena-2026",
    name: "Google Play Arena BGMI",
    game: "BGMI",
    date: "Dec 14–20, 2026",
    location: "Hybrid · venue pending confirmation",
    prize: "₹28,00,000",
    status: "Upcoming",
    color: "rose",
    mark: "GPA",
    logoUrl: "/assets/tournaments/google-play-arena.avif",
    organizer: "Google India · NODWIN Gaming",
    format: "16-team Grand Finals",
    formatDetail:
      "One listed stage. Six of 16 team slots are filled; the remaining slots are pending.",
    broadcast: "Broadcast details to be announced",
    sourceUrl: `${amaze}/bgmi/tournaments/google-play-arena-bgmi`,
    sourceLabel: "eSportsAmaze",
    teams: 16,
    confirmedTeams: 6,
    tier: "B-Tier",
    stages: 1,
    matches: 0,
    season: "2026",
    competitionMode: "Squads TPP",
    eventType: "Hybrid",
    description:
      "A BGMI competition within Google Play Arena, organized by Google India and NODWIN Gaming. The hybrid event is scheduled for December, with venue details and remaining team slots pending.",
  },
  {
    id: "bmic-2026",
    name: "Battlegrounds Mobile India International Cup 2026",
    game: "BGMI",
    date: "Oct 30 – Nov 1, 2026",
    location: "Sardar Vallabhbhai Patel Indoor Stadium, Mumbai",
    prize: "₹1,00,00,000",
    status: "Completed",
    color: "blue",
    mark: "BMIC",
    logoUrl: "/assets/tournaments/bmic-2026.avif",
    editionLabel: "BMIC 2026",
    archiveSeries: "BMIC",
    archiveYear: "2026",
    isArchiveEdition: true,
    organizer: "KRAFTON · Tesseract Esports",
    format: "16-team LAN · 18 matches",
    formatDetail:
      "Six teams qualified from India, five from South Korea and five from Japan. Teams played six matches per day across three matchdays.",
    broadcast: "Event concluded",
    sourceUrl: `${liquipedia}/Battlegrounds_Mobile_India_International_Cup/2026`,
    sourceLabel: "Liquipedia",
    teams: 16,
    tier: "A-Tier",
    winner: "Nongshim Redforce",
    runnerUp: "DRX",
    thirdPlace: "Dplus",
    points: 233,
    stages: 1,
    matches: 18,
    season: "2026",
    competitionMode: "Squads TPP",
    eventType: "LAN",
    description:
      "A 16-team international LAN event at Mumbai’s Sardar Vallabhbhai Patel Indoor Stadium. Nongshim RedForce claimed the title with 233 points, followed by DRX and Dplus.",
  },
  {
    id: "bmsd-2026",
    name: "Battlegrounds Mobile India ShowDown 2026",
    game: "BGMI",
    date: "Sep 22 – Oct 18, 2026",
    location: "Savaaya Convention, Hyderabad",
    prize: "₹1,00,00,000",
    status: "Completed",
    color: "rose",
    mark: "BMSD",
    logoUrl: "/assets/tournaments/bmsd-2026.avif",
    editionLabel: "BMSD 2026",
    archiveSeries: "BMSD",
    archiveYear: "2026",
    isArchiveEdition: true,
    organizer: "KRAFTON · Tesseract Esports",
    format: "48-team LAN · 8 stages",
    formatDetail:
      "Forty-eight qualified squads competed in Squads TPP across 144 matches. Team SouL won the Grand Finals with 155 points.",
    broadcast: "Event concluded",
    sourceUrl: `${liquipedia}/Battlegrounds_Mobile_India_Showdown/2026`,
    sourceLabel: "Liquipedia",
    teams: 48,
    tier: "A-Tier",
    winner: "Team SouL",
    runnerUp: "Gladiators Esports",
    thirdPlace: "Team 8BIT",
    points: 155,
    stages: 8,
    matches: 144,
    season: "3",
    competitionMode: "Squads TPP",
    eventType: "LAN",
    description:
      "Team SouL won the Grand Finals with 155 points. Gladiators Esports finished second and Team 8BIT placed third, separated by a single point.",
  },
  {
    id: "bgms-2026",
    name: "Battlegrounds Mobile India Masters Series 2026",
    game: "BGMI",
    date: "Aug 10 – Sep 6, 2026",
    location: "NODWIN Gaming Arena, Chhattarpur, New Delhi",
    prize: "₹1,00,00,000",
    status: "Completed",
    color: "sand",
    mark: "BGMS",
    logoUrl: "/assets/tournaments/bgms-2026.avif",
    editionLabel: "BGMS Season 5",
    archiveSeries: "BGMS",
    archiveYear: "2026",
    isArchiveEdition: true,
    organizer: "NODWIN Gaming",
    format: "26-team LAN · 8 stages",
    formatDetail:
      "Twenty-six qualified squads competed in Squads TPP across 162 matches. Nebula Esports won the Grand Finals with 210 points.",
    broadcast: "Event concluded",
    sourceUrl: `${liquipedia}/BGMI_Masters_Series/Season_5`,
    sourceLabel: "Liquipedia",
    teams: 26,
    tier: "B-Tier",
    winner: "Nebula Esports",
    runnerUp: "Gladiators Esports",
    thirdPlace: "Orangutan",
    points: 210,
    stages: 8,
    matches: 162,
    season: "5",
    competitionMode: "Squads TPP",
    eventType: "LAN",
    description:
      "Completed 26-team tournament. Nebula Esports finished first with 210 points, ahead of Gladiators Esports and Orangutan.",
  },
  {
    id: "bmps-2026",
    name: "Battlegrounds Mobile India Pro Series 2026",
    game: "BGMI",
    date: "May 6 – Jun 21, 2026",
    location: "Jaipur Exhibition & Convention Centre, Jaipur",
    prize: "₹4,00,00,000",
    status: "Completed",
    color: "lavender",
    mark: "BMPS",
    logoUrl: "/assets/tournaments/bmps-2026.avif",
    editionLabel: "BMPS 2026",
    archiveSeries: "BMPS",
    archiveYear: "2026",
    isArchiveEdition: true,
    organizer: "KRAFTON · NODWIN Gaming",
    format: "64-team hybrid · 8 stages",
    formatDetail:
      "The series progressed through Round 1, Round 2, Round 3, Round 4, Survival, Semi Finals, Last Chance and Grand Finals. GodLike Esports won the 18-match Grand Finals with 162 points.",
    broadcast: "Event concluded",
    sourceUrl: `${liquipedia}/Battlegrounds_Mobile_India_Pro_Series/2026`,
    sourceLabel: "Liquipedia",
    teams: 64,
    tier: "A-Tier",
    winner: "GodLike Esports",
    runnerUp: "Divine Gaming",
    thirdPlace: "Victores Sumus",
    points: 162,
    stages: 8,
    matches: 174,
    season: "5",
    competitionMode: "Squads TPP",
    eventType: "Online & Offline",
    description:
      "GodLike Esports won the 2026 Pro Series with 162 points, followed by Divine Gaming and Victores Sumus. The hybrid event ran from May 6 to June 21, with Grand Finals in Jaipur.",
  },
  {
    id: "bgis-2026",
    name: "Battlegrounds Mobile India Series 2026",
    game: "BGMI",
    date: "Jan 26 – Mar 29, 2026",
    location: "Chennai & Hyderabad, India",
    prize: "₹4,00,00,000",
    status: "Completed",
    color: "blue",
    mark: "BGIS",
    logoUrl: "/assets/tournaments/bgis-2026.png",
    editionLabel: "BGIS 2026",
    archiveSeries: "BGIS",
    archiveYear: "2026",
    isArchiveEdition: true,
    organizer: "KRAFTON India",
    format: "24-team national series",
    formatDetail:
      "A national BGMI championship spanning Chennai and Hyderabad. Team SouL finished first, with Genesis Esports as runner-up.",
    broadcast: "Event concluded",
    sourceUrl: `${liquipedia}/Battlegrounds_Mobile_India_Series/2026`,
    sourceLabel: "Liquipedia",
    teams: 24,
    tier: "A-Tier",
    winner: "Team SouL",
    runnerUp: "Genesis Esports",
    thirdPlace: "Orangutan",
    points: 173,
    stages: 6,
    matches: 54,
    season: "2026",
    competitionMode: "Squads TPP",
    eventType: "Online & Offline",
    description:
      "Team SouL won the 2026 series, with Genesis Esports finishing as runner-up across the championship’s 24-team field.",
  },
];

// Historical editions use the supplied local series artwork. Edition-specific results are listed where verified;
// fields not published here stay clearly marked as unavailable on the detail page.
const historicalEditions: Array<{
  id: string;
  series: string;
  label: string;
  title: string;
  year: string;
  game: string;
  date: string;
  location: string;
  organizer: string;
  format: string;
  winner?: string;
  runnerUp?: string;
  logo: string;
  color: string;
  sourcePath: string;
}> = [
  {
    id: "bgis-2021",
    series: "BGIS",
    label: "BGIS 2021",
    title: "Battlegrounds Mobile India Series 2021",
    year: "2021",
    game: "BGMI",
    date: "Dec 4, 2021 – Jan 16, 2022",
    location: "India",
    organizer: "KRAFTON India",
    format: "National championship",
    winner: "Skylightz Gaming",
    runnerUp: "TSM",
    logo: "/assets/tournaments/bgis-2026.png",
    color: "blue",
    sourcePath: "Battlegrounds_Mobile_India_Series/2021",
  },
  {
    id: "bgis-2023",
    series: "BGIS",
    label: "BGIS 2023",
    title: "Battlegrounds Mobile India Series 2023",
    year: "2023",
    game: "BGMI",
    date: "Oct 12–15, 2023",
    location: "Mumbai, India",
    organizer: "KRAFTON India",
    format: "16-team LAN finals",
    winner: "Gladiators Esports",
    runnerUp: "BIG BROTHER ESPORTS",
    logo: "/assets/tournaments/bgis-2026.png",
    color: "blue",
    sourcePath: "Battlegrounds_Mobile_India_Series/2023",
  },
  {
    id: "bgis-2024",
    series: "BGIS",
    label: "BGIS 2024",
    title: "Battlegrounds Mobile India Series 2024",
    year: "2024",
    game: "BGMI",
    date: "Jun 28–30, 2024",
    location: "Hyderabad, India",
    organizer: "KRAFTON India",
    format: "16-team LAN finals",
    winner: "Team XSpark",
    runnerUp: "Global Esports",
    logo: "/assets/tournaments/bgis-2026.png",
    color: "blue",
    sourcePath: "Battlegrounds_Mobile_India_Series/2024",
  },
  {
    id: "bgis-2025",
    series: "BGIS",
    label: "BGIS 2025",
    title: "Battlegrounds Mobile India Series 2025",
    year: "2025",
    game: "BGMI",
    date: "Mar 29 – Apr 27, 2025",
    location: "Kolkata, India",
    organizer: "KRAFTON India",
    format: "32-team national series",
    winner: "Team Versatile",
    runnerUp: "GodLike Esports",
    logo: "/assets/tournaments/bgis-2026.png",
    color: "blue",
    sourcePath: "Battlegrounds_Mobile_India_Series/2025",
  },
  {
    id: "bmps-2022",
    series: "BMPS",
    label: "BMPS 2022",
    title: "Battlegrounds Mobile India Pro Series 2022",
    year: "2022",
    game: "BGMI",
    date: "May 19 – Jun 12, 2022",
    location: "India",
    organizer: "KRAFTON India",
    format: "24-team league and finals",
    winner: "Team SouL",
    runnerUp: "OREsports",
    logo: "/assets/tournaments/bmps-2025.avif",
    color: "lavender",
    sourcePath: "Battlegrounds_Mobile_India_Pro_Series/Season_1",
  },
  {
    id: "bmps-2023",
    series: "BMPS",
    label: "BMPS 2023",
    title: "Battlegrounds Mobile India Pro Series 2023",
    year: "2023",
    game: "BGMI",
    date: "Dec 15–17, 2023",
    location: "Ahmedabad, India",
    organizer: "KRAFTON India",
    format: "16-team LAN finals",
    winner: "Blind eSports",
    runnerUp: "Gladiators Esports",
    logo: "/assets/tournaments/bmps-2025.avif",
    color: "lavender",
    sourcePath: "Battlegrounds_Mobile_India_Pro_Series/2023",
  },
  {
    id: "bmps-2024",
    series: "BMPS",
    label: "BMPS 2024",
    title: "Battlegrounds Mobile India Pro Series 2024",
    year: "2024",
    game: "BGMI",
    date: "Sep 27–29, 2024",
    location: "Kochi, India",
    organizer: "KRAFTON India",
    format: "16-team LAN finals",
    winner: "Team XSpark",
    runnerUp: "Numen Esports",
    logo: "/assets/tournaments/bmps-2025.avif",
    color: "lavender",
    sourcePath: "Battlegrounds_Mobile_India_Pro_Series/2024",
  },
  {
    id: "bmps-2025",
    series: "BMPS",
    label: "BMPS 2025",
    title: "Battlegrounds Mobile India Pro Series 2025",
    year: "2025",
    game: "BGMI",
    date: "Jun 14 – Jul 6, 2025",
    location: "Delhi, India",
    organizer: "KRAFTON India",
    format: "32-team league and finals",
    winner: "Aryan x TMG Gaming",
    runnerUp: "NoNx Esports",
    logo: "/assets/tournaments/bmps-2025.avif",
    color: "lavender",
    sourcePath: "Battlegrounds_Mobile_India_Pro_Series/2025",
  },
  {
    id: "bgms-s1",
    series: "BGMS",
    label: "BGMS Season 1",
    title: "BGMI Masters Series Season 1",
    year: "2022",
    game: "BGMI",
    date: "Jun 24 – Jul 17, 2022",
    location: "New Delhi, India",
    organizer: "NODWIN Gaming",
    format: "Season league and finals",
    winner: "Global Esports",
    runnerUp: "GodLike Esports",
    logo: "/assets/tournaments/bgms-2026.avif",
    color: "sand",
    sourcePath: "BGMI_Masters_Series/Season_1",
  },
  {
    id: "bgms-s2",
    series: "BGMS",
    label: "BGMS Season 2",
    title: "BGMI Masters Series Season 2",
    year: "2023",
    game: "BGMI",
    date: "Aug 4–27, 2023",
    location: "Delhi NCR, India",
    organizer: "NODWIN Gaming",
    format: "Season league and finals",
    winner: "Gladiators Esports",
    runnerUp: "Orangutan",
    logo: "/assets/tournaments/bgms-2026.avif",
    color: "sand",
    sourcePath: "BGMI_Masters_Series/Season_2",
  },
  {
    id: "bgms-s3",
    series: "BGMS",
    label: "BGMS Season 3",
    title: "BGMI Masters Series Season 3",
    year: "2024",
    game: "BGMI",
    date: "Jul 19 – Aug 11, 2024",
    location: "Delhi NCR, India",
    organizer: "NODWIN Gaming",
    format: "Season league and finals",
    winner: "Team SouL",
    runnerUp: "Entity Gaming",
    logo: "/assets/tournaments/bgms-2026.avif",
    color: "sand",
    sourcePath: "BGMI_Masters_Series/Season_3",
  },
  {
    id: "bgms-s4",
    series: "BGMS",
    label: "BGMS Season 4",
    title: "BGMI Masters Series Season 4",
    year: "2025",
    game: "BGMI",
    date: "Aug 18 – Sep 14, 2025",
    location: "Delhi NCR, India",
    organizer: "NODWIN Gaming",
    format: "Season league and finals",
    winner: "K9 Esports",
    runnerUp: "Sinewy Esports",
    logo: "/assets/tournaments/bgms-2026.avif",
    color: "sand",
    sourcePath: "BGMI_Masters_Series/Season_4",
  },
  {
    id: "bmsd-2022",
    series: "BMSD",
    label: "BMSD 2022",
    title: "Battlegrounds Mobile India Showdown 2022",
    year: "2022",
    game: "BGMI",
    date: "Jul 21–24, 2022",
    location: "Delhi NCR, India",
    organizer: "KRAFTON India",
    format: "24-team LAN tournament",
    winner: "7Sea Esports",
    runnerUp: "Orangutan",
    logo: "/assets/tournaments/bmsd-2026.avif",
    color: "rose",
    sourcePath: "Battlegrounds_Mobile_India_Showdown/2022",
  },
  {
    id: "bmsd-2025",
    series: "BMSD",
    label: "BMSD 2025",
    title: "Battlegrounds Mobile India Showdown 2025",
    year: "2025",
    game: "BGMI",
    date: "Sep 18 – Oct 12, 2025",
    location: "Hyderabad, India",
    organizer: "KRAFTON India",
    format: "48-team LAN tournament",
    winner: "Orangutan",
    runnerUp: "K9 Esports",
    logo: "/assets/tournaments/bmsd-2026.avif",
    color: "rose",
    sourcePath: "Battlegrounds_Mobile_India_Showdown/2025",
  },
  {
    id: "bmic-2025",
    series: "BMIC",
    label: "BMIC 2025",
    title: "Battlegrounds Mobile India International Cup 2025",
    year: "2025",
    game: "BGMI",
    date: "Oct 31 – Nov 2, 2025",
    location: "Delhi, India",
    organizer: "KRAFTON · Tesseract Esports",
    format: "16-team international LAN",
    winner: "DRX",
    runnerUp: "True Rippers",
    logo: "/assets/tournaments/bmic-2026.avif",
    color: "blue",
    sourcePath: "Battlegrounds_Mobile_India_International_Cup/2025",
  },
  {
    id: "inkr-2023",
    series: "IN-KR",
    label: "IN-KR 2023",
    title: "India – Korea Invitational 2023",
    year: "2023",
    game: "BGMI",
    date: "Oct 26–28, 2023",
    location: "Pragati Maidan, Delhi, India",
    organizer: "KRAFTON · Tesseract Esports",
    format: "16-team offline invitational · 15 matches",
    winner: "Dplus",
    runnerUp: "Gods Reign",
    logo: "/assets/tournaments/in-kr-2023.svg",
    color: "blue",
    sourcePath: "India_Korea_Invitational/2023",
  },
  {
    id: "pmgc-2020",
    series: "PMGC",
    label: "PMGC 2020",
    title: "PUBG Mobile Global Championship 2020",
    year: "2020",
    game: "PUBG Mobile",
    date: "Nov 24, 2020 – Jan 26, 2021",
    location: "Dubai, UAE",
    organizer: "KRAFTON · Tencent Games",
    format: "Global championship",
    winner: "Nova Esports",
    runnerUp: "Four Angry Men",
    logo: "/assets/tournaments/pmgc-2026.webp",
    color: "lavender",
    sourcePath: "PUBG_Mobile_Global_Championship/2020",
  },
  {
    id: "pmgc-2021",
    series: "PMGC",
    label: "PMGC 2021",
    title: "PUBG Mobile Global Championship 2021",
    year: "2021",
    game: "PUBG Mobile",
    date: "Nov 30, 2021 – Jan 23, 2022",
    location: "Online",
    organizer: "KRAFTON · Tencent Games",
    format: "Global championship",
    winner: "Nova Esports",
    runnerUp: "Natus Vincere",
    logo: "/assets/tournaments/pmgc-2026.webp",
    color: "lavender",
    sourcePath: "PUBG_Mobile_Global_Championship/2021",
  },
  {
    id: "pmgc-2022",
    series: "PMGC",
    label: "PMGC 2022",
    title: "PUBG Mobile Global Championship 2022",
    year: "2022",
    game: "PUBG Mobile",
    date: "Nov 10, 2022 – Jan 8, 2023",
    location: "Jakarta, Indonesia · Kuala Lumpur, Malaysia",
    organizer: "KRAFTON · Tencent Games",
    format: "Global championship",
    winner: "S2G Esports",
    runnerUp: "DRS Gaming",
    logo: "/assets/tournaments/pmgc-2026.webp",
    color: "lavender",
    sourcePath: "PUBG_Mobile_Global_Championship/2022",
  },
  {
    id: "pmgc-2023",
    series: "PMGC",
    label: "PMGC 2023",
    title: "PUBG Mobile Global Championship 2023",
    year: "2023",
    game: "PUBG Mobile",
    date: "Nov 2 – Dec 10, 2023",
    location: "Istanbul, Turkey · Kuala Lumpur, Malaysia",
    organizer: "KRAFTON · Tencent Games",
    format: "Global championship",
    winner: "IHC Esports",
    runnerUp: "Stalwart Esports",
    logo: "/assets/tournaments/pmgc-2026.webp",
    color: "lavender",
    sourcePath: "PUBG_Mobile_Global_Championship/2023",
  },
  {
    id: "pmgc-2024",
    series: "PMGC",
    label: "PMGC 2024",
    title: "PUBG Mobile Global Championship 2024",
    year: "2024",
    game: "PUBG Mobile",
    date: "Oct 31 – Dec 8, 2024",
    location: "Kuala Lumpur, Malaysia · London, UK",
    organizer: "KRAFTON · Tencent Games",
    format: "49-team global championship",
    winner: "Dplus",
    runnerUp: "Regnum Carya Bra Esports",
    logo: "/assets/tournaments/pmgc-2026.webp",
    color: "lavender",
    sourcePath: "PUBG_Mobile_Global_Championship/2024",
  },
  {
    id: "pmgc-2025",
    series: "PMGC",
    label: "PMGC 2025",
    title: "PUBG Mobile Global Championship 2025",
    year: "2025",
    game: "PUBG Mobile",
    date: "Nov 24 – Dec 14, 2025",
    location: "Bangkok, Thailand",
    organizer: "KRAFTON · Tencent Games",
    format: "40-team global championship",
    winner: "Alpha7 Esports",
    runnerUp: "ULF Esports",
    logo: "/assets/tournaments/pmgc-2026.webp",
    color: "lavender",
    sourcePath: "PUBG_Mobile_Global_Championship/2025",
  },
  {
    id: "pmwc-2024",
    series: "PMWC",
    label: "PMWC 2024",
    title: "PUBG Mobile World Cup 2024",
    year: "2024",
    game: "PUBG Mobile",
    date: "Jul 19–28, 2024",
    location: "Riyadh, Saudi Arabia",
    organizer: "Level Infinite · KRAFTON",
    format: "28-team international event · 3 stages",
    winner: "Alpha7 Esports",
    runnerUp: "REJECT",
    logo: "/assets/tournaments/pmwc.png",
    color: "blue",
    sourcePath: "PUBG_Mobile_World_Cup/2024",
  },
  {
    id: "pmwc-2025",
    series: "PMWC",
    label: "PMWC 2025",
    title: "PUBG Mobile World Cup 2025",
    year: "2025",
    game: "PUBG Mobile",
    date: "Jul 25 – Aug 3, 2025",
    location: "Riyadh, Saudi Arabia",
    organizer: "Level Infinite · KRAFTON",
    format: "24-team international event",
    winner: "Yangon Galacticos",
    runnerUp: "Weibo Gaming",
    logo: "/assets/tournaments/pmwc.png",
    color: "blue",
    sourcePath: "PUBG_Mobile_World_Cup/2025",
  },
  {
    id: "pmwc-2026",
    series: "PMWC",
    label: "PMWC 2026",
    title: "PUBG Mobile World Cup 2026",
    year: "2026",
    game: "PUBG Mobile",
    date: "Aug 6–16, 2026",
    location: "Paris, France",
    organizer: "Level Infinite · KRAFTON",
    format: "32-team international event",
    winner: "S2G Esports",
    runnerUp: "Nongshim RedForce",
    logo: "/assets/tournaments/pmwc.png",
    color: "blue",
    sourcePath: "PUBG_Mobile_World_Cup/2026",
  },
];

const historicalTournamentEntries: Tournament[] = historicalEditions.map(
  (edition) => ({
    id: edition.id,
    name: edition.title,
    editionLabel: edition.label,
    archiveSeries: edition.series,
    archiveYear: edition.year,
    isArchiveEdition: true,
    game: edition.game,
    date: edition.date,
    location: edition.location,
    prize: "Prize pool not recorded",
    status: "Completed",
    color: edition.color,
    mark: edition.series,
    logoUrl: edition.logo,
    organizer: edition.organizer,
    format: edition.format,
    formatDetail: edition.winner
      ? `${edition.label} concluded with ${edition.winner} as champion${edition.runnerUp ? ` and ${edition.runnerUp} as runner-up` : ""}. Open the event record for stage results and placement details.`
      : `${edition.label} event record. Open the event page for the published format and results.`,
    broadcast: "Event concluded",
    sourceUrl: `${liquipedia}/${edition.sourcePath}`,
    sourceLabel: "Liquipedia",
    tier: edition.game === "PUBG Mobile" ? "S-Tier" : "A-Tier",
    season: edition.year,
    competitionMode: "Squads TPP",
    eventType:
      edition.format.includes("offline") || edition.format.includes("LAN")
        ? "LAN"
        : "International",
    ...(edition.winner ? { winner: edition.winner } : {}),
    ...(edition.runnerUp ? { runnerUp: edition.runnerUp } : {}),
    description: `${edition.title} was a ${edition.game} esports tournament${edition.winner ? ` won by ${edition.winner}${edition.runnerUp ? `, with ${edition.runnerUp} finishing second` : ""}` : ""}. Tournament format, standings, prize distribution and participants are available in the event record.`,
    referenceUrls: [`${liquipedia}/${edition.sourcePath}`],
  }),
);
tournaments.push(...historicalTournamentEntries);

// Edition-specific facts for the archive. These keep the archive cards and event
// pages useful even when a tournament's full match-by-match table is unavailable.
const historicalFacts: Record<
  string,
  {
    prize: string;
    teams?: number;
    tier?: string;
    stages?: number;
    matches?: number;
    thirdPlace?: string;
    details: string;
  }
> = {
  "bgis-2021": {
    prize: "₹1,00,00,000",
    teams: 16,
    tier: "A-Tier",
    stages: 5,
    matches: 16,
    thirdPlace: "OR Esports",
    details:
      "The inaugural BGIS concluded with a 16-team final in January 2022. Skylightz Gaming won the title, with TSM finishing second.",
  },
  "bgis-2023": {
    prize: "₹2,00,00,000",
    teams: 16,
    tier: "A-Tier",
    stages: 5,
    matches: 18,
    thirdPlace: "Team SouL",
    details:
      "The 2023 series culminated in a 16-team LAN final at Mumbai’s Sardar Vallabhbhai Patel Indoor Stadium. Gladiators Esports took the title ahead of BIG BROTHER Esports.",
  },
  "bgis-2024": {
    prize: "₹2,00,00,000",
    teams: 16,
    tier: "A-Tier",
    stages: 5,
    matches: 18,
    thirdPlace: "Reckoning Esports",
    details:
      "The Hyderabad Grand Finals featured 16 teams across 18 matches. Team XSpark won ahead of Global Esports and Reckoning Esports.",
  },
  "bgis-2025": {
    prize: "₹3,00,00,000",
    teams: 32,
    tier: "A-Tier",
    stages: 6,
    matches: 18,
    thirdPlace: "Orangutan",
    details:
      "The national series ran from March to April and concluded with a 32-team field in Kolkata. Team Versatile won the finals, followed by GodLike Esports.",
  },
  "bmps-2022": {
    prize: "₹2,00,00,000",
    teams: 24,
    tier: "A-Tier",
    stages: 3,
    matches: 24,
    thirdPlace: "Team XO",
    details:
      "The first Pro Series used a league phase followed by finals. Team SouL claimed the title, with OR Esports (OREsports) in second place.",
  },
  "bmps-2023": {
    prize: "₹1,00,00,000",
    teams: 16,
    tier: "A-Tier",
    stages: 3,
    matches: 18,
    thirdPlace: "Team SouL",
    details:
      "The 2023 Pro Series finished with a 16-team LAN final in Ahmedabad. Blind Esports won the championship ahead of Gladiators Esports.",
  },
  "bmps-2024": {
    prize: "₹2,00,00,000",
    teams: 16,
    tier: "A-Tier",
    stages: 3,
    matches: 18,
    thirdPlace: "Team SouL",
    details:
      "The Kochi finals brought together 16 teams for 18 matches. Team XSpark finished first and Numen Esports took second.",
  },
  "bmps-2025": {
    prize: "₹4,00,00,000",
    teams: 32,
    tier: "A-Tier",
    stages: 5,
    matches: 18,
    thirdPlace: "Gods Reign",
    details:
      "The 32-team Pro Series concluded in Delhi. Aryan x TMG Gaming won the title and NoNx Esports finished second.",
  },
  "bgms-s1": {
    prize: "₹1,52,50,000",
    teams: 24,
    tier: "A-Tier",
    stages: 4,
    matches: 24,
    thirdPlace: "Team SouL",
    details:
      "The inaugural Masters Series was a televised league and finals event hosted at the NODWIN Gaming Arena in New Delhi. Global Esports won the season.",
  },
  "bgms-s2": {
    prize: "₹2,10,00,000",
    teams: 24,
    tier: "A-Tier",
    stages: 4,
    matches: 24,
    thirdPlace: "Team SouL",
    details:
      "Season 2 ran across Delhi NCR in August 2023. Gladiators Esports finished first, ahead of Orangutan.",
  },
  "bgms-s3": {
    prize: "₹1,00,00,000",
    teams: 24,
    tier: "A-Tier",
    stages: 4,
    matches: 24,
    thirdPlace: "Revenant Esports",
    details:
      "Season 3 ran from July to August 2024 in Delhi NCR. Team SouL won the series, with Entity Gaming as runner-up.",
  },
  "bgms-s4": {
    prize: "$162,216",
    teams: 28,
    tier: "A-Tier",
    stages: 4,
    matches: 24,
    thirdPlace: "Orangutan",
    details:
      "Season 4 ran from August to September 2025 in Delhi NCR. K9 Esports won the championship, followed by Sinewy Esports.",
  },
  "bmsd-2022": {
    prize: "₹15,00,000",
    teams: 24,
    tier: "A-Tier",
    stages: 1,
    matches: 18,
    thirdPlace: "Team SouL",
    details:
      "The 2022 Showdown was a 24-team LAN event in Delhi NCR. 7Sea Esports won the title with Orangutan as runner-up.",
  },
  "bmsd-2025": {
    prize: "$112,674",
    teams: 48,
    tier: "A-Tier",
    stages: 5,
    matches: 18,
    thirdPlace: "Team SouL",
    details:
      "The 48-team event progressed through league and qualification stages to a 16-team Grand Finals in Hyderabad. Orangutan won the finals ahead of K9 Esports.",
  },
  "bmic-2025": {
    prize: "₹1,00,00,000",
    teams: 16,
    tier: "A-Tier",
    stages: 1,
    matches: 18,
    thirdPlace: "CAG Osaka",
    details:
      "The first International Cup brought together eight Indian, four South Korean and four Japanese teams for 18 matches in Delhi. DRX won, followed by True Rippers and CAG Osaka.",
  },
  "inkr-2023": {
    prize: "₹1,00,00,000",
    teams: 16,
    tier: "A-Tier",
    stages: 1,
    matches: 15,
    thirdPlace: "emTek StormX",
    details:
      "The India–Korea Invitational was a 16-team offline event at Pragati Maidan in Delhi. Dplus won the 15-match event ahead of Gods Reign.",
  },
  "pmgc-2020": {
    prize: "$2,000,000",
    teams: 24,
    tier: "S-Tier",
    stages: 3,
    matches: 29,
    thirdPlace: "Natus Vincere",
    details:
      "The inaugural Global Championship was played from November 2020 to January 2021. Nova Esports won the title, with Four Angry Men as runner-up.",
  },
  "pmgc-2021": {
    prize: "$6,000,000",
    teams: 40,
    tier: "S-Tier",
    stages: 3,
    matches: 42,
    thirdPlace: "Nigma Galaxy",
    details:
      "The 2021 world championship ran from November to January across league and finals stages. Nova Esports defended the title, with Natus Vincere second.",
  },
  "pmgc-2022": {
    prize: "$4,000,000",
    teams: 50,
    tier: "S-Tier",
    stages: 3,
    matches: 46,
    thirdPlace: "Four Angry Men",
    details:
      "The 2022 championship ran across Indonesia and Malaysia. S2G Esports won the Grand Finals, followed by DRS Gaming.",
  },
  "pmgc-2023": {
    prize: "$3,000,000",
    teams: 50,
    tier: "S-Tier",
    stages: 3,
    matches: 48,
    thirdPlace: "Alpha7 Esports",
    details:
      "The 2023 global championship featured league, survival and finals stages. IHC Esports won the title, followed by Stalwart Esports and Alpha7 Esports.",
  },
  "pmgc-2024": {
    prize: "$3,000,000",
    teams: 49,
    tier: "S-Tier",
    stages: 3,
    matches: 48,
    thirdPlace: "Alpha7 Esports",
    details:
      "The 2024 championship ran through Kuala Lumpur and London. Dplus won the finals, with Regnum Carya Bra Esports second.",
  },
  "pmgc-2025": {
    prize: "$3,000,000",
    teams: 40,
    tier: "S-Tier",
    stages: 3,
    matches: 42,
    thirdPlace: "Alpha Gaming",
    details:
      "The 2025 world championship was hosted in Bangkok. Alpha7 Esports won the title, followed by ULF Esports and Alpha Gaming.",
  },
  "pmwc-2024": {
    prize: "$3,000,000",
    teams: 28,
    tier: "S-Tier",
    stages: 3,
    matches: 30,
    thirdPlace: "Tianba",
    details:
      "The inaugural World Cup was held in Riyadh across three stages. Alpha7 Esports won the Grand Finals, followed by REJECT and Tianba.",
  },
  "pmwc-2025": {
    prize: "$3,000,000",
    teams: 24,
    tier: "S-Tier",
    stages: 3,
    matches: 18,
    thirdPlace: "Alpha7 Esports",
    details:
      "The 2025 World Cup was held in Riyadh and featured 24 teams. Yangon Galacticos claimed the title ahead of Weibo Gaming.",
  },
  "pmwc-2026": {
    prize: "$3,000,000",
    teams: 32,
    tier: "S-Tier",
    stages: 3,
    matches: 18,
    thirdPlace: "Alpha7 Esports",
    details:
      "The 2026 World Cup was hosted in Paris. S2G Esports won the championship, followed by Nongshim RedForce.",
  },
};
for (const item of tournaments) {
  const facts = historicalFacts[item.id];
  if (!facts) continue;
  Object.assign(item, facts, {
    formatDetail: facts.details,
    description: `${item.name} was a ${item.game} tournament held ${item.date}. ${facts.details} The event offered a ${facts.prize} prize pool.`,
  });
}

const tournamentMonthOrder = [
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
function tournamentTimelineValue(item: Tournament) {
  const year = Number(
    item.archiveYear ?? item.date.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? 9999,
  );
  const start = item.date.match(
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})/,
  );
  const month = start ? tournamentMonthOrder.indexOf(start[1]) : 0;
  const day = start ? Number(start[2]) : 1;
  return Date.UTC(year, month, day);
}
function tournamentTimelineYear(item: Tournament) {
  return Number(
    item.archiveYear ?? item.date.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? 0,
  );
}
tournaments.sort(
  (a, b) =>
    tournamentTimelineYear(b) - tournamentTimelineYear(a) ||
    tournamentTimelineValue(a) - tournamentTimelineValue(b),
);

export const teams: Team[] = [
  {
    id: "soul",
    name: "Team SouL",
    game: "BGMI",
    region: "India",
    rank: 1,
    points: 2250,
    trend: "▲1",
    initials: "S",
    accent: "sand",
    logoUrl:
      "https://liquipedia.net/commons/images/5/57/Team_Soul_2019_allmode.png",
    highlights: [
      "BGIS 2026 champion",
      "BMSD 2026 champion · 155 finals points",
    ],
  },
  {
    id: "godlike",
    name: "GodLike Esports",
    game: "BGMI",
    region: "India",
    rank: 2,
    points: 1895,
    trend: "▼1",
    initials: "G",
    accent: "rose",
    logoUrl:
      "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788897902278-2d5c6cb3.png&w=640",
    highlights: ["BMPS 2026 champion · 160 finals points"],
  },
  {
    id: "outrage",
    name: "Team Outrage",
    game: "BGMI",
    region: "India",
    rank: 3,
    points: 1640,
    trend: "—",
    initials: "O",
    accent: "blue",
    logoUrl:
      "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788898228202-90c64151.png&w=1080",
    highlights: ["CEGC 2026 Group Stage 1 · 2nd · 74 points"],
  },
  {
    id: "gladiators",
    name: "Gladiators Esports",
    game: "BGMI",
    region: "India",
    rank: 4,
    points: 1520,
    trend: "▲8",
    initials: "G",
    accent: "lavender",
    logoUrl:
      "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788897848335-95eaf518.png&w=640",
    highlights: [
      "BMSD 2026 runner-up · 141 finals points",
      "BGMS 2026 runner-up · 189 finals points",
    ],
  },
  {
    id: "elite-nova",
    name: "Elite Nova Esports",
    game: "BGMI",
    region: "India",
    rank: 5,
    points: 1480,
    trend: "▼1",
    initials: "EN",
    accent: "sand",
    highlights: [],
  },
  {
    id: "orangutan",
    name: "Orangutan",
    game: "BGMI",
    region: "India",
    rank: 6,
    points: 1365,
    trend: "▼1",
    initials: "O",
    accent: "rose",
    logoUrl:
      "https://media.sportstiger.com/media/oka-1719048419008-original.webp",
    highlights: ["BGMS 2026 third place · 187 finals points"],
  },
  {
    id: "genesis",
    name: "Genesis Esports",
    game: "BGMI",
    region: "India",
    rank: 7,
    points: 1290,
    trend: "▼1",
    initials: "GE",
    accent: "blue",
    logoUrl:
      "https://escharts.com/metaImage/teams/genesis?game=117&v=1771819059",
    highlights: ["BGIS 2026 runner-up"],
  },
  {
    id: "8bit",
    name: "Team 8BIT",
    game: "BGMI",
    region: "India",
    rank: 8,
    points: 1180,
    trend: "▲10",
    initials: "8B",
    accent: "lavender",
    logoUrl:
      "https://liquipedia.net/commons/images/thumb/3/30/8bit_allmode.png/600px-8bit_allmode.png",
    highlights: ["BMSD 2026 third place · 140 finals points"],
  },
  {
    id: "apex",
    name: "Team Apex Gaming",
    game: "BGMI",
    region: "India",
    rank: 9,
    points: 1180,
    trend: "▲1",
    initials: "A",
    accent: "sand",
    logoUrl:
      "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788898206364-3d02c8b8.png&w=640",
    highlights: ["CEGC 2026 Group Stage 1 · 10th · 52 points"],
  },
  {
    id: "revenant",
    name: "Revenant XSpark",
    game: "BGMI",
    region: "India",
    rank: 10,
    points: 1140,
    trend: "▼2",
    initials: "RX",
    accent: "rose",
    logoUrl:
      "https://liquipedia.net/commons/images/2/2b/Revenant_XSpark_2026_allmode.png",
    highlights: ["CEGC 2026 Group Stage 1 · 1st · 83 points"],
  },
];

export const cegcGroupAStandings: TournamentStanding[] = [
  {
    rank: 1,
    name: "Team Tamilas",
    points: 133,
    wins: 1,
    placementPoints: 47,
    eliminations: 86,
  },
  {
    rank: 2,
    name: "Myth Official",
    points: 121,
    wins: 2,
    placementPoints: 42,
    eliminations: 79,
  },
  {
    rank: 3,
    name: "Unsigned Esports",
    points: 120,
    wins: 0,
    placementPoints: 38,
    eliminations: 82,
  },
  {
    rank: 4,
    name: "Raven Esports",
    points: 119,
    wins: 1,
    placementPoints: 52,
    eliminations: 67,
  },
  {
    rank: 5,
    name: "Epigrotive Gaming",
    points: 113,
    wins: 2,
    placementPoints: 46,
    eliminations: 67,
  },
  {
    rank: 6,
    name: "Team Apex Gaming",
    points: 110,
    wins: 2,
    placementPoints: 39,
    eliminations: 71,
  },
  {
    rank: 7,
    name: "RSPT Official",
    points: 104,
    wins: 3,
    placementPoints: 52,
    eliminations: 52,
  },
  {
    rank: 8,
    name: "HiggBoson Esports",
    points: 93,
    wins: 1,
    placementPoints: 38,
    eliminations: 55,
  },
  {
    rank: 9,
    name: "K9 Esports",
    points: 92,
    wins: 1,
    placementPoints: 26,
    eliminations: 66,
  },
  {
    rank: 10,
    name: "Gladiators Esports",
    points: 91,
    wins: 1,
    placementPoints: 27,
    eliminations: 64,
  },
  {
    rank: 11,
    name: "iQOO 8Bit",
    points: 86,
    wins: 1,
    placementPoints: 21,
    eliminations: 65,
  },
  {
    rank: 12,
    name: "VR1 Esports",
    points: 79,
    wins: 1,
    placementPoints: 20,
    eliminations: 59,
  },
  {
    rank: 13,
    name: "Vasista Esports",
    points: 78,
    wins: 0,
    placementPoints: 20,
    eliminations: 58,
  },
  {
    rank: 14,
    name: "4TR Official",
    points: 69,
    wins: 0,
    placementPoints: 23,
    eliminations: 46,
  },
  {
    rank: 15,
    name: "Lastade Esports",
    points: 64,
    wins: 0,
    placementPoints: 19,
    eliminations: 45,
  },
  {
    rank: 16,
    name: "MadKings",
    points: 28,
    wins: 0,
    placementPoints: 2,
    eliminations: 26,
  },
];

export const cegcGroupBStandings: TournamentStanding[] = [
  {
    rank: 1,
    name: "Team Outrage",
    points: 113,
    wins: 2,
    placementPoints: 44,
    eliminations: 69,
  },
  {
    rank: 2,
    name: "Nebula Esports",
    points: 107,
    wins: 1,
    placementPoints: 28,
    eliminations: 79,
  },
  {
    rank: 3,
    name: "GodLike Esports",
    points: 101,
    wins: 2,
    placementPoints: 48,
    eliminations: 53,
  },
  {
    rank: 4,
    name: "iQOO Revenant XSpark",
    points: 98,
    wins: 1,
    placementPoints: 35,
    eliminations: 63,
  },
  {
    rank: 5,
    name: "GoSolo Rapid Chaos",
    points: 76,
    wins: 1,
    placementPoints: 28,
    eliminations: 48,
  },
  {
    rank: 6,
    name: "iQOO Orangutan",
    points: 75,
    wins: 0,
    placementPoints: 14,
    eliminations: 61,
  },
  {
    rank: 7,
    name: "Blue Army",
    points: 74,
    wins: 2,
    placementPoints: 30,
    eliminations: 44,
  },
  {
    rank: 8,
    name: "Team AX",
    points: 69,
    wins: 0,
    placementPoints: 29,
    eliminations: 40,
  },
  {
    rank: 9,
    name: "Wyld Fangs",
    points: 66,
    wins: 0,
    placementPoints: 24,
    eliminations: 42,
  },
  {
    rank: 10,
    name: "Genesis Esports",
    points: 58,
    wins: 1,
    placementPoints: 22,
    eliminations: 36,
  },
  {
    rank: 11,
    name: "Santa Esports Titans",
    points: 57,
    wins: 1,
    placementPoints: 22,
    eliminations: 35,
  },
  {
    rank: 12,
    name: "Blitz Esports",
    points: 56,
    wins: 0,
    placementPoints: 16,
    eliminations: 40,
  },
  {
    rank: 13,
    name: "Thunder Hawks",
    points: 55,
    wins: 0,
    placementPoints: 13,
    eliminations: 42,
  },
  {
    rank: 14,
    name: "Mysterious4 Esports",
    points: 55,
    wins: 0,
    placementPoints: 12,
    eliminations: 43,
  },
  {
    rank: 15,
    name: "Welt Esports",
    points: 41,
    wins: 1,
    placementPoints: 14,
    eliminations: 27,
  },
  {
    rank: 16,
    name: "Meta Ninza",
    points: 36,
    wins: 0,
    placementPoints: 5,
    eliminations: 31,
  },
];
export const cegcStandings = cegcGroupAStandings;

const cegcTeamLogoUrls: Record<string, string> = {
  "Team Apex Gaming":
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788898206364-3d02c8b8.png&w=640",
  "iQOO 8Bit":
    "https://liquipedia.net/commons/images/thumb/3/30/8bit_allmode.png/600px-8bit_allmode.png",
  "Team 8BIT":
    "https://liquipedia.net/commons/images/thumb/3/30/8bit_allmode.png/600px-8bit_allmode.png",
  "iQOO Team Tamilas":
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788898252110-fd96b7d7.png&w=640",
  "Team Tamilas":
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788898252110-fd96b7d7.png&w=640",
  "Gladiators Esports":
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788897848335-95eaf518.png&w=640",
  "K9 Esports":
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788897979595-1fe9223b.png&w=640",
  Madkings:
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-madkings-1988c34436d2.webp&w=640",
  MadKings:
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-madkings-1988c34436d2.webp&w=640",
  "Vasista Esports":
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788898274980-6f190995.png&w=640",
  "GoSolo Epigrotive Gaming":
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788897804451-8b786474.png&w=640",
  "Epigrotive Gaming":
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788897804451-8b786474.png&w=640",
  "GodLike Esports":
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788897902278-2d5c6cb3.png&w=640",
  "Team Outrage":
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788898228202-90c64151.png&w=640",
  "Nebula Esports":
    "https://esportsamaze.com/_next/image?q=75&url=%2Fapi%2Fmedia%2Fteam-logo-1788898000330-7e580c82.png&w=640",
  "Genesis Esports":
    "https://escharts.com/metaImage/teams/genesis?game=117&v=1771819059",
  "iQOO Orangutan":
    "https://media.sportstiger.com/media/oka-1719048419008-original.webp",
  Orangutan:
    "https://media.sportstiger.com/media/oka-1719048419008-original.webp",
  "iQOO Revenant XSpark":
    "https://liquipedia.net/commons/images/2/2b/Revenant_XSpark_2026_allmode.png",
  "Revenant XSpark":
    "https://liquipedia.net/commons/images/2/2b/Revenant_XSpark_2026_allmode.png",
};

// Tournament records are cross-checked against both event databases; provider labels stay out of the UI.
const tournamentReferenceMap: Record<string, string[]> = {
  "cegc-2026": [
    `${amaze}/bgmi/tournaments/chennai-esports-global-championship-2026`,
    `${liquipedia}/Chennai_Esports_Global_Championship/2026`,
  ],
  "cegc-2025": [
    `${amaze}/bgmi/tournaments/chennai-esports-global-championship-2025-3`,
    `${liquipedia}/Chennai_Esports_Global_Championship/2025`,
  ],
  "pmgc-2026": [
    `${amaze}/pubgm/tournaments`,
    `${liquipedia}/PUBG_Mobile_Global_Championship/2026`,
  ],
  "battlin-open-track-1": [
    `${amaze}/bgmi/tournaments`,
    `${liquipedia}/Battlegrounds_Mobile_India`,
  ],
  "jioblast-gully-wars": [
    `${amaze}/bgmi/tournaments`,
    `${liquipedia}/Battlegrounds_Mobile_India`,
  ],
  "battlin-open-track-2": [
    `${amaze}/bgmi/tournaments`,
    `${liquipedia}/Battlegrounds_Mobile_India`,
  ],
  "google-play-arena-2026": [
    `${amaze}/bgmi/tournaments/google-play-arena-bgmi`,
    `${liquipedia}/Battlegrounds_Mobile_India`,
  ],
  "bmic-2026": [
    `${amaze}/bgmi/tournaments/battlegrounds-mobile-india-international-cup-2026`,
    `${liquipedia}/Battlegrounds_Mobile_India_International_Cup/2026`,
  ],
  "bmsd-2026": [
    `${amaze}/bgmi/tournaments/battlegrounds-mobile-india-showdown-2026`,
    `${liquipedia}/Battlegrounds_Mobile_India_Showdown/2026`,
  ],
  "bgms-2026": [
    `${amaze}/bgmi/tournaments/bgms-2026`,
    `${liquipedia}/BGMI_Masters_Series/Season_5`,
  ],
  "bmps-2026": [
    `${amaze}/bgmi/tournaments/battlegrounds-mobile-india-pro-series-2026`,
    `${liquipedia}/Battlegrounds_Mobile_India_Pro_Series/2026`,
  ],
  "bgis-2026": [
    `${amaze}/bgmi/tournaments/battlegrounds-mobile-india-series-2026`,
    `${liquipedia}/Battlegrounds_Mobile_India_Series/2026`,
  ],
};
tournaments.forEach((tournament) => {
  tournament.referenceUrls = tournamentReferenceMap[tournament.id];
});

const makeParticipants = (
  names: string[],
  route?: string,
): TournamentParticipant[] =>
  names.map((name) => ({ name, ...(route ? { route } : {}) }));
const makeCegcParticipants = (
  names: string[],
  route: string,
): TournamentParticipant[] =>
  names.map((name) => ({
    name,
    route,
    ...(!route.endsWith("Phase 1") ||
    !["iQOO 8Bit", "iQOO Revenant XSpark"].includes(name)
      ? cegcTeamLogoUrls[name]
        ? { logoUrl: cegcTeamLogoUrls[name] }
        : {}
      : {}),
  }));
export const tournamentParticipants: Record<string, TournamentParticipant[]> = {
  "cegc-2025": makeCegcParticipants(
    [
      "Team SouL",
      "True Rippers",
      "Gods Reign",
      "Victores Sumus",
      "Revenant XSpark",
      "Welt Esports",
      "NoNx Esports",
      "FS Esports",
      "Vasista Esports",
      "8Bit",
      "Team Versatile",
      "Autobotz Esports",
      "K9 Esports",
      "Blitz Esports",
      "Cincinnati Kids",
      "Team Tamilas",
    ],
    "Grand Finals",
  ),
  "cegc-2026": [
    ...makeCegcParticipants(
      [
        "Team Apex Gaming",
        "iQOO 8Bit",
        "iQOO Team Tamilas",
        "Gladiators Esports",
        "K9 Esports",
        "GoSolo Epigrotive Gaming",
        "RSPT Official",
        "GoSolo Higgboson",
        "Lastade Esports",
        "4TR Official",
        "Madkings",
        "Raven Esports",
        "Unsigned Esports",
        "Vasista Esports",
        "Myth Officials",
        "VR1 Esports",
      ],
      "Group A · Phase 1",
    ),
    ...makeCegcParticipants(
      [
        "GodLike Esports",
        "Wyld Fangs",
        "iQOO Revenant XSpark",
        "iQOO Orangutan",
        "WELT Esports",
        "Mysterious 4",
        "Santa Esports",
        "Blitz Esports",
        "Team Outrage",
        "Meta Ninza",
        "Nebula Esports",
        "Genesis Esports",
        "Team Hector",
        "GoSolo Rapid Chaos",
        "Blue Army",
        "Team AX",
      ],
      "Group B · Phase 1",
    ),
  ],
  "pmgc-2026": makeParticipants(
    [
      "ULF Esports",
      "BRX MSM Esports",
      "AK Gold Esports",
      "Sharper Esports",
      "Bigetron by Vitality",
      "eArena",
      "Team Flash",
      "4Thrives Esports",
      "Horaa Esports",
      "Trained to Kill",
      "The MongolZ",
      "Aurora Gaming",
      "OLD NOT",
      "GOAT Team",
      "4K Esports",
      "iKURD ESPORTS",
      "AlUla Club Esports",
      "Geekay Esports",
      "Nigma Galaxy",
      "R8 Esports",
      "S2G Esports",
      "Gaming Stars Esports",
      "Selibon Esports",
      "BUF Esports",
      "Hustler Crew",
      "Boars Gaming",
      "Wolves Esports",
      "RoW Esports",
      "FURIA",
      "Alpha7 Esports",
      "18 Esports",
      "All Gamers",
      "Weibo Gaming",
      "LGD Gaming",
      "Nongshim RedForce",
      "Valor",
      "Team SouL",
      "DRX",
    ],
    "Qualified · roster not announced",
  ),
  "google-play-arena-2026": makeParticipants(
    [
      "Team SouL",
      "GodLike Esports",
      "Team Apex Gaming",
      "Revenant XSpark",
      "Orangutan",
      "Mahi Clutchers",
    ],
    "Partner clubs · event lineup pending",
  ),
  "bmic-2026": makeParticipants(
    [
      "Nongshim Redforce",
      "DRX",
      "Dplus KIA",
      "Gladiators Esports",
      "Team Outrage",
      "K9 Esports",
      "Daejeon Game PT",
      "Kinotrope Gaming",
      "Team 8BIT",
      "Blitz Esports × Epigrotive Gaming",
      "REIGNITE",
      "Team SouL",
      "FOCUS",
      "Making The Road",
      "Valor",
      "Versus",
    ],
    "Grand Finals",
  ),
  "bmsd-2026": makeParticipants(
    [
      "Team SouL",
      "Gladiators Esports",
      "Team 8BIT",
      "K9 Esports",
      "Blitz Epigrotive Gaming",
      "Team Outrage",
      "Version1 x Blue Army",
      "Welt Esports",
      "Meta Ninza",
      "Team Apex Gaming",
      "Revenant XSpark",
      "Myth Official",
      "Wyld Fangs",
      "Nebula Esports",
      "GodLike Esports",
      "Genesis Esports",
      "Elite Nova Esports",
      "Team Tamilas",
      "Vasista Esports",
      "Team Aryan",
      "Orangutan",
      "Rapid Chaos Esports",
      "Learn From Past",
      "Cultrex x Zero Ark",
      "7Gods Esports",
      "Madkings Esports",
      "4TR Official",
      "HyperCatz",
      "MYSTERIOUS 4",
      "Reckoning Esports",
      "Raspator Esports",
      "Higgboson Esports",
      "Lastade Esports",
      "Vijay Esports",
      "Quantum Sparks",
      "Iris Esports",
      "Team H4K",
      "Carpe Diem",
      "White Walkers",
      "The Knight Mobs",
      "Santa ESP",
      "SBS Esports",
      "WindGod Esports",
      "GENxFM Esports",
      "Godsent Forever",
      "4Ends Esports",
      "Naqsh Esports",
      "Rising Esports",
    ],
    "Invited · 48-team field",
  ),
  "bgms-2026": makeParticipants(
    [
      "GodLike Esports",
      "Orangutan",
      "Team Outrage",
      "Elite Nova Esports",
      "Gladiators Esports",
      "Team Apex Gaming",
      "Team Tamilas",
      "Vasista Esports",
      "Reckoning Esports",
      "Nebula Esports",
      "8Bit",
      "Genesis Esports",
      "Team SouL",
      "7Gods Esports",
      "Revenant XSpark",
      "Myth Official",
      "Rapid Chaos Esports",
      "Epigrotive Gaming",
      "Zero Ark Official",
      "K9 Esports",
      "Wyld Fangs",
      "Quantum Sparks",
    ],
    "Invited",
  ).concat(
    makeParticipants(
      ["Santa Esports", "White Walkers", "HyperCatz", "Aura x Esports"],
      "TVS Wicked Battles qualifier",
    ),
  ),
  "bmps-2026": [
    ...makeParticipants(
      [
        "GodLike Esports",
        "8Bit",
        "Team SouL",
        "Vasista Esports",
        "Divine Gaming",
        "Orangutan",
        "Victores Sumus",
        "7Gods Esports",
      ],
      "Grand Finals",
    ),
    ...makeParticipants(
      [
        "4TR Official",
        "Team Tamilas",
        "Nebula Esports",
        "Welt Esports",
        "Revenant XSpark",
        "Wyld Fangs",
        "Meta Ninza",
        "WindGod Esports",
        "Gods Reign",
        "Genesis Esports",
        "Reckoning Esports",
        "Autobotz Esports",
        "White Walkers",
        "Zero Ark Official",
        "Higgboson Esports",
        "MYSTERIOUS 4",
      ],
      "Semi Finals",
    ),
    ...makeParticipants(
      [
        "Team H4K",
        "Rapid Chaos Esports",
        "Godsent Esports",
        "Madkings Esports",
        "Jaguar Esports",
        "Myth Official",
        "True Rippers",
        "Naqsh Esports",
        "Team Versatile",
        "Learn From Past",
        "K9 Esports",
        "Troy Tamilans Esports",
        "Team Apex Gaming",
        "Lastade Esports",
        "Quantum Sparks",
        "Team Aryan",
        "Rising Esports",
        "Aura x Esports",
        "Riot Nationz",
        "DCxSCR Esports",
        "Ares Esport",
        "Team RedXRoss",
        "Esports Social",
        "HADX Esports",
        "Santa Esports",
        "Team Doxy",
        "GENxFM Esports",
        "Phoenix Esports",
        "Likitha Esports",
        "T7xOrion Esports",
        "Thundergods x Tortuga Gaming",
        "NoNx Esports",
      ],
      "Survival Stage",
    ),
    ...makeParticipants(
      [
        "Godsent Legions",
        "Someones Dream",
        "Jaapi Esports",
        "7ACESxTRB Esports",
        "Futurise Esports x Empire Originals",
        "Team Flying Esports",
        "Blink Esports",
        "Oops Official",
      ],
      "Eliminated in Qualifiers",
    ),
  ],
};

// Event-locked player lineups. Teams without a confirmed event roster are left unfilled.
export const tournamentRosters: Record<
  string,
  Record<string, TournamentRoster>
> = {
  "cegc-2026": {
    "Team Apex Gaming": {
      captain: "Jellly",
      players: ["Jellly", "Jonathan16", "Hydrooo", "Harsh05"],
      substitutes: ["KioLmao"],
    },
    "iQOO 8Bit": {
      captain: "Juicy",
      players: ["Juicy", "Sarang", "Skipz", "Shubh1"],
      substitutes: ["Shorty"],
    },
    "iQOO Team Tamilas": {
      captain: "MrIGL67",
      players: ["MrIGL67", "Reaper", "justy06", "ProToN"],
      substitutes: ["Troll"],
    },
    "Gladiators Esports": {
      captain: "Neyo",
      players: ["Neyo", "Aquanox", "Justin", "DeltaPG"],
      substitutes: ["Destro"],
    },
    "K9 Esports": {
      captain: "Saumraj",
      players: ["Saumraj", "Taurus06", "Beast", "Viper"],
      substitutes: ["Stranger"],
    },
    "GoSolo Epigrotive Gaming": {
      captain: "Romann",
      players: ["Romann", "Levii", "Fierce", "Proo"],
      substitutes: ["Spirit"],
    },
    "RSPT Official": {
      captain: "Ayden",
      players: ["Ayden", "Maxioso", "Auxin", "FoxOP"],
      substitutes: ["Vpix22"],
    },
    "GoSolo Higgboson": {
      captain: "bunny9",
      players: ["bunny9", "hero", "RshBoy", "wT1GER"],
      substitutes: ["omega"],
    },
    "Lastade Esports": {
      captain: "EviLGOC",
      players: ["EviLGOC", "AfuGOC", "KaalanGOC", "5pyGOC"],
      substitutes: ["MonsterGOC"],
    },
    "4TR Official": {
      captain: "AnonYmous",
      players: ["AnonYmous", "Eggy666", "ViPER", "Arther"],
      substitutes: ["FlexJod"],
    },
    Madkings: {
      captain: "ShadowOG",
      players: ["ShadowOG", "Clutchgoddd", "Nobi", "Godx22"],
      substitutes: ["Smoker46"],
    },
    "Raven Esports": {
      captain: "MORTY",
      players: ["MORTY", "SarwarOG", "PAINsLIVE", "ChandanOp"],
      substitutes: ["JatinOG"],
    },
    "Unsigned Esports": {
      captain: "MOKSH",
      players: ["MOKSH", "RexBoy13", "NinjA", "TiGerOG"],
      substitutes: ["MasTerUwU"],
    },
    "Vasista Esports": {
      captain: "AADIII",
      players: ["AADIII", "KNOWME", "PRATıK69", "Shayaan"],
      substitutes: ["RaGeGoD"],
    },
    "Myth Officials": {
      captain: "DETROX",
      players: ["DETROX", "HARSHIL", "DADDY", "HeXe1707"],
      substitutes: ["LuCiFeR"],
    },
    "VR1 Esports": {
      captain: "Punkk",
      players: ["Punkk", "A1mbot", "S1MPP", "GodZ"],
      substitutes: ["Achukk"],
    },
    "GodLike Esports": {
      captain: "ManYa",
      players: ["ManYa", "SPOWERR", "Admino", "Saum4Y"],
      substitutes: ["Nub"],
    },
    "Wyld Fangs": {
      captain: "SENSEI9og",
      players: ["SENSEI9og", "SPRAYGOD", "GOTEN", "K4NHHA"],
      substitutes: ["Superb"],
    },
    "iQOO Revenant XSpark": {
      captain: "Shadow",
      players: ["Shadow", "Trace", "Pain", "Phoenix"],
      substitutes: ["NinjaJOD"],
    },
    "iQOO Orangutan": {
      captain: "Aaru",
      players: ["Aaru", "WizzGOD", "AKop", "ATTANKI"],
      substitutes: ["Prem"],
    },
    "WELT Esports": {
      captain: "GokulWNL",
      players: ["GokulWNL", "SHYAM", "RICO", "JONNY"],
      substitutes: ["AIMGOD"],
    },
    "Mysterious 4": {
      captain: "Gokuu",
      players: ["Gokuu", "Henry", "GyroGOD", "Rapido"],
      substitutes: ["Noob"],
    },
    "Santa Esports": {
      captain: "BeardBaBa",
      players: ["BeardBaBa", "YuvaOP", "PokoWNL", "DragonOP"],
      substitutes: ["EzOL"],
    },
    "Blitz Esports": {
      captain: "Areeb28",
      players: ["Areeb28", "Lobster", "Ralphie", "Lovish"],
      substitutes: ["Dionysus"],
    },
    "Team Outrage": {
      captain: "omegaaaa",
      players: ["omegaaaa", "slug", "knightū", "ninjaboi"],
      substitutes: ["JDGaming"],
    },
    "Meta Ninza": {
      captain: "Apollozz",
      players: ["Apollozz", "NadeGod", "Javin", "Adonis"],
      substitutes: ["Osmium"],
    },
    "Nebula Esports": {
      captain: "OWAIS",
      players: ["OWAIS", "MAFIAA", "VENOM", "ScaryJoD"],
      substitutes: ["PARITOSH"],
    },
    "Genesis Esports": {
      captain: "Gravity",
      players: ["Gravity", "Fury", "HunterZ", "KRATOS"],
      substitutes: ["Zap01"],
    },
    "Team Hector": {
      captain: "Hectorrr",
      players: ["Hectorrr", "AimGod", "Snowjod", "Termi"],
      substitutes: ["RonY"],
    },
    "GoSolo Rapid Chaos": {
      captain: "FLASH",
      players: ["FLASH", "DhruvG", "frager", "Toxic"],
      substitutes: ["Psycho"],
    },
    "Blue Army": {
      captain: "HONEY",
      players: ["HONEY", "SahilOpAf", "Max", "flawk22"],
      substitutes: ["KING29"],
    },
    "Team AX": {
      captain: "ARYAN14",
      players: ["ARYAN14", "SYRAX", "devotee", "raiden"],
      substitutes: ["pro"],
    },
  },
  "bmic-2026": {
    "Nongshim Redforce": {
      captain: "XZY",
      players: ["XZY", "TIZ1", "HYUNBIN", "SOEZ", "Janchi"],
    },
    DRX: {
      captain: "Qxzzz",
      players: ["Qxzzz", "BINI", "Hoxy", "TRE", "Bigfafa"],
    },
    "Dplus KIA": {
      captain: "chpz",
      players: ["chpz", "Nolbu", "Cyxae", "Porico", "Auto"],
    },
    "Daejeon Game PT": {
      players: ["YoRoRong", "JAEMIN", "JAESUK", "AaRon", "Raychel"],
    },
    "Kinotrope Gaming": { players: ["OZISAN", "TAMR4", "Naoto", "SPORTA"] },
    "Team SouL": {
      captain: "NakuL",
      players: ["NakuL", "Goblin", "Jokerr", "LEGIT", "Thunder"],
    },
    "Team Outrage": {
      captain: "Omega",
      players: ["Omega", "NinjaBoi", "Slug", "Knight"],
    },
    "Team 8BIT": {
      captain: "Juicy",
      players: ["Sarang", "Juicy", "Shubh", "Skipz", "Shorty"],
    },
    "Gladiators Esports": {
      captain: "Neyo",
      players: ["Neyo", "AquaNox", "DeltaPG", "Justin"],
    },
    "K9 Esports": {
      captain: "Saumraj",
      players: ["Saumraj", "SnowJOD", "Taurus06", "Stranger", "Smoker46"],
    },
    "Blitz Esports × Epigrotive Gaming": {
      captain: "Areeb",
      players: ["Areeb", "EGGY", "Lobster", "Ralphie", "FanOP"],
    },
    REIGNITE: {
      captain: "Taiki",
      players: ["Taiki", "YamaK", "miz", "Nagon", "Razzy"],
    },
    "Making The Road": {
      captain: "REX",
      players: ["REX", "相棒最強", "PINE喰", "Garnet", "MTR"],
    },
    Valor: {
      captain: "泰心",
      players: ["泰心", "p1r", "DokC", "Missile", "ちぽまる"],
    },
    Versus: {
      captain: "MasaX",
      players: ["MasaX", "Reeey", "北斎", "Lumine", "Ace", "MimoriN"],
    },
    FOCUS: { players: ["Hyde", "Mahito", "Mammoth", "Newjeans", "Rizzz"] },
  },
  "bmsd-2026": {
    "Team SouL": {
      captain: "NakuL",
      players: ["NakuL", "Goblin", "Jokerr", "LEGIT", "Thunder"],
    },
    "Gladiators Esports": {
      captain: "Neyo",
      players: ["Neyo", "Justin", "AquaNox", "DeltaPG", "Destro"],
    },
    "Team 8BIT": {
      captain: "Juicy",
      players: ["Sarang", "Juicy", "Shubh", "Skipz", "Shorty"],
    },
    "Team Outrage": {
      captain: "Omega",
      players: ["Omega", "NinjaBoi", "Slug", "Knight"],
    },
    "Team Apex Gaming": {
      captain: "Jelly",
      players: ["Jelly", "Harsh", "Hydro", "Jonathan", "KioLmao"],
    },
    "Revenant XSpark": {
      captain: "NinjaJod",
      players: ["NinjaJod", "Pain", "Proton", "Sukuna", "TraceGod"],
    },
    "Nebula Esports": {
      captain: "Aadi",
      players: ["Aadi", "Arjun", "KRATOS", "Phoenix", "KnowMe"],
    },
    "GodLike Esports": {
      captain: "Manya",
      players: ["Manya", "ADMINO", "Godz", "Saum4y", "Spower"],
    },
    "K9 Esports": {
      captain: "Saumraj",
      players: ["Saumraj", "SnowJOD", "Smoker46", "Taurus06", "Stranger"],
    },
    "Myth Official": {
      captain: "Detrox",
      players: ["Lucifer", "Daddy", "Detrox", "Harshil", "Aryton"],
    },
    "Wyld Fangs": {
      captain: "SENSEI",
      players: ["Kanha", "SENSEI", "Goten", "SPRAYGOD", "Sam999"],
    },
    "Genesis Esports": {
      captain: "GravityJOD",
      players: ["HunterZ", "Zap", "GravityJOD", "FurY", "VipeR"],
    },
    "Blitz Epigrotive Gaming": {
      players: ["Areeb", "EGGY", "Lobster", "Ralphie", "FanOP"],
    },
    "Version1 x Blue Army": {
      captain: "Punkk",
      players: ["Punkk", "Omega", "Termi", "Shayaan", "Achuk"],
    },
    "Welt Esports": {
      captain: "GokulWNL",
      players: ["DragonOP", "PokoWNL", "Rico", "SHYAM", "GokulWNL"],
    },
    "Meta Ninza": {
      captain: "Shadow7",
      players: ["Fierce", "Apollo", "Auxin", "Shadow7", "javin"],
    },
    "Elite Nova Esports": {
      captain: "Owais",
      players: ["Owais", "Mafia36", "VeNoM", "ScaryJod", "Paritosh"],
    },
    "Team Tamilas": {
      captain: "MrIGL",
      players: ["Reaper", "MrIGL", "MantyOP", "JustyOp", "AIMGOD"],
    },
    "Vasista Esports": {
      captain: "Hector",
      players: ["Rony", "Beast", "Dionysus", "A1mbot", "Hector"],
    },
    "Team Aryan": { players: ["Aryan", "Devotee", "Syrax", "Raiden", "PRO"] },
    Orangutan: {
      captain: "Aaru",
      players: ["Aaru", "AKop", "WizzGOD", "Attanki"],
    },
    "Rapid Chaos Esports": {
      captain: "FLASH",
      players: ["FLASH", "PSYCHO", "Fragger", "Toxic", "DhruvOG"],
    },
    "Learn From Past": {
      captain: "HONEY",
      players: ["HONEY", "JDGamingYT", "Yash", "MAX", "Ryu"],
    },
    "Cultrex x Zero Ark": {
      captain: "Morty",
      players: ["JatinOG", "Morty", "ChandanOP", "SarwarOG", "PainIsLive"],
    },
    "7Gods Esports": {
      captain: "Moksh",
      players: ["Moksh", "Ninjuu", "NinjA", "Rexboy", "Noir99"],
    },
    "Madkings Esports": {
      captain: "SHADOW",
      players: ["Troye", "SIMP", "SHADOW", "ClutchGod", "Nobi"],
    },
    "4TR Official": {
      captain: "Anonymous",
      players: ["Anonymous", "Rapido", "FlexJod", "Arther", "Viper"],
    },
    HyperCatz: {
      captain: "Hexe",
      players: ["SKETCH", "xHiTMAN", "Spiriit", "Hexe", "BeasT"],
    },
    "MYSTERIOUS 4": { players: ["GOKU", "NAMAN", "krsna", "Henry", "Noob"] },
    "Reckoning Esports": {
      captain: "Roman",
      players: ["SahilOPAF", "Roman", "Lovish", "Levi", "ProBGMI"],
    },
    "Raspator Esports": { players: ["Ayden", "Maxioso", "Hesperos", "Jazzy"] },
    "Higgboson Esports": {
      captain: "Bunny",
      players: ["HEROO", "RushBoy", "Godx", "WhiteTiger", "Bunny"],
    },
    "Lastade Esports": {
      players: ["ShaDow", "Kaalan", "Evil", "AFU", "SpyOp"],
    },
    "Vijay Esports": {
      players: ["SycnoOG", "Litboii", "Zucksyyy", "JONNY", "STUNN"],
    },
    "Quantum Sparks": {
      captain: "ScoutOP",
      players: ["Yashuu", "ScoutOP", "MasTer", "Archit", "Daksh"],
    },
    "Iris Esports": {
      captain: "TapGod",
      players: ["TapGod", "Arto", "Chokeboy", "YprBolte", "Harshu"],
    },
    "Team H4K": { players: ["Sujal", "RageGod", "Mac", "Nodii", "Wizard"] },
    "Carpe Diem": {
      players: ["GamlaBoy", "Insidious", "PHANTOM", "K47", "FuZzy"],
    },
    "White Walkers": {
      captain: "DreamS",
      players: ["Veyron", "AnujTooOP", "Beast04", "DreamS"],
    },
    "The Knight Mobs": {
      players: ["Armxn", "Superb", "Zeref", "Lucifer999", "Amaan"],
    },
    "Santa ESP": {
      captain: "Alpha05",
      players: ["Alpha05", "BanditGod", "CoFFIN", "PUNISHER11", "ADONIS"],
    },
    "SBS Esports": { players: ["Aadi07", "Pratik69", "Prince", "Shockwave"] },
    "WindGod Esports": {
      captain: "Ryzen",
      players: ["Ryzen", "InfinityOP", "Kyzer", "Probot", "RIOO"],
    },
    "GENxFM Esports": {
      players: ["dipop", "Damuuu78", "Ghost", "Bunny14", "MoGLiOp"],
    },
    "Godsent Forever": {
      players: ["RanveerOG", "Nihu", "Matrix", "Yamiii", "Pratham"],
    },
    "4Ends Esports": {
      players: ["BadOP", "GyroGod", "Joyesh", "Superman", "MannyJOD"],
    },
    "Naqsh Esports": {
      captain: "Wanted",
      players: ["KrishOP", "FraggerNUB", "Kalyug", "Dope", "Wanted"],
    },
    "Rising Esports": {
      players: ["BeardBaba", "EzoL", "Foul619", "YuvaOP", "FoxOP"],
    },
  },
  "bmps-2026": {
    "GodLike Esports": {
      captain: "Manya",
      players: ["Manya", "ADMINO", "Saumay", "Spower", "Godz", "Smxkie"],
    },
    "8Bit": {
      captain: "Juicy",
      players: ["Juicy", "Sarang", "Skipz", "Shubh", "Shorty"],
    },
    "Team SouL": {
      captain: "NakuL",
      players: ["NakuL", "Goblin", "LEGIT", "Jokerr", "Thunder"],
    },
    "Vasista Esports": {
      captain: "Hector",
      players: ["Hector", "Beast", "A1mbot", "Rony", "Dionysus"],
    },
    "Divine Gaming": {
      captain: "Omega",
      players: ["Omega", "Slug", "NinjaBoi", "Knight", "Amit"],
    },
    Orangutan: {
      captain: "Aaru",
      players: ["Aaru", "AK", "WizzGOD", "Attanki", "Prem"],
    },
    "Victores Sumus": {
      captain: "Owais",
      players: ["Owais", "VeNoM", "ScaryJod", "Mafia36", "Paritosh"],
    },
    "7Gods Esports": {
      captain: "Moksh",
      players: ["Moksh", "Noir99", "Ninjuu", "Rexboy", "NinjA"],
    },
    "4TR Official": {
      captain: "Anonymous",
      players: ["Anonymous", "VipeR", "Arther", "Rapido", "FlexJod"],
    },
    "Team Tamilas": {
      captain: "MrIGL",
      players: ["MrIGL", "Reaper", "AIMGOD", "JustyOp", "MantyOP"],
    },
    "Nebula Esports": {
      captain: "Aadi",
      players: ["Aadi", "KnowMe", "Phoenix", "KRATOS", "Arjun"],
    },
    "Welt Esports": {
      captain: "GokulWNL",
      players: ["GokulWNL", "Shyam", "Rico", "DragonOP", "PokoWNL"],
    },
    "Revenant XSpark": {
      captain: "NinjaJOD",
      players: ["NinjaJOD", "Proton", "Tracegod", "Pain09", "Sukuna"],
    },
    "Wyld Fangs": {
      players: ["SENSEI", "SPRAYGOD", "Goten", "Kanha", "Sam999"],
    },
    "Meta Ninza": {
      captain: "Shadow7",
      players: ["Shadow7", "Fierce", "Apollo", "Javin", "Auxin", "Osmium"],
    },
    "WindGod Esports": {
      captain: "RyzeN",
      players: ["RyzeN", "InfinityOP", "Kyzer", "Probot", "RIOO"],
    },
    "Genesis Esports": {
      captain: "GravityJOD",
      players: ["GravityJOD", "ViPER", "HunterZ", "FurY", "Zap"],
    },
    "Reckoning Esports": {
      captain: "Roman",
      players: ["Roman", "Lovish", "Levi", "SahilOPAF", "ProBGMI"],
    },
    "White Walkers": {
      captain: "DreamS",
      players: ["DreamS", "Veyron", "AnujTooOP", "Beast04", "Aryzen"],
    },
    "Higgboson Esports": {
      captain: "Bunny",
      players: ["Bunny", "HEROO", "RushBoy", "Godx", "WhiteTiger"],
    },
    "MYSTERIOUS 4": {
      captain: "GOKU",
      players: ["GOKU", "Naman", "Nooob", "Henry", "KRSNAJOD19"],
    },
    "Myth Official": {
      captain: "Detrox",
      players: ["Detrox", "Lucifer", "Daddy", "Harshil", "Aryton"],
    },
    "Rapid Chaos Esports": {
      captain: "FLASH",
      players: ["FLASH", "Psycho", "Toxic", "DhruvOG", "fragger"],
    },
    "Team H4K": {
      captain: "Sujal",
      players: ["Sujal", "RageGod", "Wizard", "Mac", "Nodii"],
    },
    "Madkings Esports": {
      captain: "SHADOW",
      players: ["SHADOW", "ClutchGod", "SIMP", "Troye", "Nobi"],
    },
    "Jaguar Esports": {
      captain: "BHAALU",
      players: ["BHAALU", "AVNISHOP", "Avanza", "SHOGUN", "PIXIEOP"],
    },
    "Team Apex Gaming": {
      captain: "Jelly",
      players: ["Jelly", "JONATHAN", "KioLmao", "Hydro", "Harsh"],
    },
    "Team Aryan": {
      captain: "Aryan",
      players: ["Aryan", "Devotee", "Syrax", "Raiden", "PRO"],
    },
    "True Rippers": {
      captain: "Punkk",
      players: ["Punkk", "Omega", "Termi", "Shayaan", "Achuk"],
    },
    "Team Versatile": {
      captain: "Rexx64",
      players: ["Rexx64", "SmoKeR", "ClixOp", "Spartan9", "Keshu99"],
    },
    "Learn From Past": {
      captain: "Honey",
      players: ["Honey", "MAX", "JDGamingYT", "Ryu", "Yash"],
    },
    "K9 Esports": {
      captain: "Saumraj",
      players: ["Saumraj", "SnowJOD", "Taurus06", "Smoker46", "Stranger"],
    },
    "Troy Tamilans Esports": {
      captain: "Ayden",
      players: ["Ayden", "Maxioso", "Lens06", "Hesperos", "Jazzy"],
    },
    "Lastade Esports": {
      captain: "ShaDow",
      players: ["ShaDow", "Evil", "Kaalan", "SpyOp", "AFU"],
    },
    "Quantum Sparks": {
      captain: "Sc0utOP",
      players: ["Sc0utOP", "MasTer", "Archit", "Yashu", "Daksh"],
    },
    "Rising Esports": {
      captain: "BeardBaba",
      players: ["BeardBaba", "EzOL", "FouL619", "YuvaOP", "FoxOP"],
    },
    "Riot Nationz": {
      captain: "AADI",
      players: ["AADI", "Eezy", "Sunoj", "punk", "Dollar"],
    },
    "DCxSCR Esports": {
      captain: "TapGod",
      players: ["TapGod", "Arto", "Chokeboy", "YprBolte", "Harshu"],
    },
    "Ares Esport": {
      captain: "ErrorOG",
      players: ["ErrorOG", "BIJOY", "Knuckle", "BAITERR", "CluTchBoi"],
    },
    "Naqsh Esports": {
      captain: "PmwiIGL",
      players: ["PmwiIGL", "OwenOG", "Skillfull", "InfGod", "Executor"],
    },
    "Team RedXRoss": {
      captain: "Lucifer999",
      players: ["Lucifer999", "Armxn", "Zeref", "Superb", "Amaan"],
    },
    "Esports Social": {
      captain: "BaDop",
      players: ["BaDop", "MannyJOD", "GyroGOD", "Joyesh", "SuperMan"],
    },
    "HADX Esports": {
      captain: "Cypher",
      players: ["Cypher", "CEAZAR", "HOPE", "JAXXX", "Rishii", "Guraseem"],
    },
    "Team Doxy": {
      captain: "Doxy",
      players: ["Doxy", "Unq21", "DeathGOD", "YepezZzZ", "BeasTboyyyy"],
    },
    "GENxFM Esports": {
      players: ["dipop", "damuuu78", "ghost", "buNnY14", "moGLiOp"],
    },
    "Phoenix Esports": {
      captain: "EclipseOP",
      players: ["EclipseOP", "frenzyOkoK", "VENGEANCE", "Faith", "Arnav"],
    },
    "Likitha Esports": {
      captain: "DanieL",
      players: ["DanieL", "INFERNOO", "Starboyy", "Zemo", "Fusion"],
    },
    "T7xOrion Esports": {
      captain: "Cabeza03",
      players: ["Cabeza03", "Mudit", "Fantom09", "Firoo07", "Reverse"],
    },
    "Thundergods x Tortuga Gaming": {
      captain: "Abhi",
      players: ["Abhi", "Fragger", "Clozy9", "Icy", "Rambo"],
    },
    "NoNx Esports": {
      captain: "Aman",
      players: ["Aman", "Syrus", "Stunner", "Hexy", "DGbot"],
    },
    "Godsent Legions": {
      captain: "HarshOg",
      players: ["HarshOg", "Master", "ToXic26", "Emperor", "Skepp"],
    },
    "Someones Dream": {
      captain: "Dizzy18",
      players: ["Dizzy18", "Iscream26", "Ghostfxce", "KaranNotOP", "Goten69"],
    },
    "Jaapi Esports": {
      captain: "Dreamss",
      players: ["Dreamss", "ExploseR", "SKOP", "CatalysT", "Ghost"],
    },
    "7ACESxTRB Esports": {
      captain: "Coder",
      players: ["Coder", "Kraxx", "Gonu", "Ammyjod", "Rolex"],
    },
    "Futurise Esports x Empire Originals": {
      captain: "Norm4nJR",
      players: ["Norm4nJR", "Commando", "WarBoy", "ToNY", "Shooter9"],
    },
    "Team Flying Esports": {
      captain: "WhyBro1",
      players: ["WhyBro1", "JATT", "Hunter", "notKnowme", "Cobra"],
    },
    "Blink Esports": {
      captain: "MaYaNK",
      players: ["MaYaNK", "Profesir", "Jayesh", "HardikUG", "NexXuS"],
    },
    "Oops Official": {
      captain: "RaiX",
      players: ["RaiX", "AffuOP", "Element", "Reaper", "Zentrix777"],
    },
    "Autobotz Esports": {
      captain: "Areeb",
      players: ["Areeb", "EGGY", "Lobster", "Ralphie", "FanOP"],
    },
    "Gods Reign": {
      captain: "Neyo",
      players: ["Neyo", "Justin", "DeltaPG", "AquaNox", "Destro"],
    },
    "Godsent Esports": {
      captain: "FraGGy19",
      players: ["FraGGy19", "Levii911", "JunaidOG", "HunTRO", "Revenge4uu"],
    },
    "Zero Ark Official": {
      captain: "Morty",
      players: ["Morty", "PainIsLive", "JatinOG", "ChandanOP", "SarwarOG"],
    },
    "Aura x Esports": {
      captain: "Wanted",
      players: ["Wanted", "KrisOp", "FraggerNub", "KALYUG", "Dope"],
    },
    "Santa Esports": {
      captain: "Alpha05",
      players: ["Alpha05", "ADONIS", "PUNISHER11", "CoFFIN", "BanditGod"],
    },
  },
  "bgms-2026": {
    "GodLike Esports": {
      captain: "Manya",
      players: ["Manya", "ADMINO", "Saum4y", "Spower", "Godz"],
    },
    Orangutan: {
      captain: "Aaru",
      players: ["Aaru", "AK", "WizzGOD", "Attanki"],
    },
    "Team Outrage": {
      captain: "Omega",
      players: ["Omega", "Slug", "NinjaBoi", "Knight"],
    },
    "Elite Nova Esports": {
      captain: "Owais",
      players: ["Owais", "VeNoM", "ScaryJod", "Mafia36", "Paritosh"],
    },
    "Gladiators Esports": {
      captain: "Neyo",
      players: ["Neyo", "Justin", "DeltaPG", "AquaNox", "Destro"],
    },
    "Team Apex Gaming": {
      captain: "Jelly",
      players: ["Jelly", "JONATHAN", "Harsh", "Hydro", "KioLmao"],
    },
    "Team Tamilas": {
      captain: "MrIGL",
      players: ["MrIGL", "Reaper", "AIMGOD", "JustyOp", "MantyOP"],
    },
    "Vasista Esports": {
      captain: "Hector",
      players: ["Hector", "Beast", "A1mbot", "Rony", "Dionysus"],
    },
    "Reckoning Esports": {
      captain: "Roman",
      players: ["Roman", "Lovish", "Levi", "SahilOPAF", "ProBGMI"],
    },
    "Nebula Esports": {
      captain: "Aadi",
      players: ["Aadi", "KnowMe", "Phoenix", "KRATOS", "Arjun"],
    },
    "8Bit": {
      captain: "Juicy",
      players: ["Juicy", "Sarang", "Skipz", "Shubh"],
    },
    "Genesis Esports": {
      captain: "GravityJOD",
      players: ["GravityJOD", "ViPER", "HunterZ", "FurY", "Zap"],
    },
    "Team SouL": {
      captain: "NakuL",
      players: ["NakuL", "Goblin", "LEGIT", "Jokerr", "Thunder"],
    },
    "7Gods Esports": {
      captain: "Moksh",
      players: ["Moksh", "Noir99", "Ninjuu", "Rexboy", "NinjA"],
    },
    "Revenant XSpark": {
      captain: "NinjaJOD",
      players: ["NinjaJOD", "Proton", "Tracegod", "Pain09", "Sukuna"],
    },
    "Myth Official": {
      captain: "Detrox",
      players: ["Detrox", "Lucifer", "Daddy", "Harshil", "Aryton"],
    },
    "Rapid Chaos Esports": {
      captain: "FLASH",
      players: ["FLASH", "Psycho", "Toxic", "DhruvOG", "fragger"],
    },
    "Epigrotive Gaming": {
      captain: "Areeb",
      players: ["Areeb", "EGGY", "Lobster", "Ralphie", "FanOP"],
    },
    "Zero Ark Official": {
      captain: "Morty",
      players: ["Morty", "PainIsLive", "JatinOG", "ChandanOP", "SarwarOG"],
    },
    "K9 Esports": {
      captain: "Saumraj",
      players: ["Saumraj", "SnowJOD", "Stranger", "Taurus06", "Smoker46"],
    },
    "Wyld Fangs": {
      captain: "SENSEI",
      players: ["SENSEI", "SPRAYGOD", "Goten", "Kanha", "Sam999"],
    },
    "Quantum Sparks": {
      captain: "Sc0utOP",
      players: ["Sc0utOP", "MasTer", "Archit", "Yashu", "Daksh", "Ash"],
    },
    "Santa Esports": {
      captain: "Alpha05",
      players: ["Alpha05", "ADONIS", "PUNISHER11", "CoFFIN", "BanditGod"],
    },
    "White Walkers": {
      captain: "DreamS",
      players: ["DreamS", "Veyron", "AnujTooOP", "Beast04"],
    },
    HyperCatz: {
      captain: "Hexe",
      players: ["Hexe", "SKETCH", "xHiTMAN", "BeasT", "Spiriit"],
    },
    "Aura x Esports": {
      captain: "Wanted",
      players: ["Wanted", "KrisOp", "FraggerNub", "KALYUG", "Dope"],
    },
  },
};

export const tournamentStandings: Record<string, TournamentStanding[]> = {
  "cegc-2025": [
    { rank: 1, name: "Team SouL", points: 162 },
    { rank: 2, name: "True Rippers", points: 136 },
    { rank: 3, name: "Gods Reign", points: 134 },
    { rank: 4, name: "Victores Sumus", points: 117 },
    { rank: 5, name: "Revenant XSpark", points: 108 },
    { rank: 6, name: "Welt Esports", points: 97 },
    { rank: 7, name: "NoNx Esports", points: 97 },
    { rank: 8, name: "FS Esports", points: 96 },
    { rank: 9, name: "Vasista Esports", points: 94 },
    { rank: 10, name: "8Bit", points: 94 },
    { rank: 11, name: "Team Versatile", points: 93 },
    { rank: 12, name: "Autobotz Esports", points: 86 },
    { rank: 13, name: "K9 Esports", points: 79 },
    { rank: 14, name: "Blitz Esports", points: 72 },
    { rank: 15, name: "Cincinnati Kids", points: 60 },
    { rank: 16, name: "Team Tamilas", points: 39 },
  ],
  "cegc-2026": cegcStandings,
  "bmic-2026": [
    {
      rank: 1,
      name: "Nongshim Redforce",
      points: 233,
      wins: 5,
      placementPoints: 85,
      eliminations: 148,
    },
    {
      rank: 2,
      name: "DRX",
      points: 151,
      wins: 2,
      placementPoints: 52,
      eliminations: 99,
    },
    {
      rank: 3,
      name: "Dplus KIA",
      points: 149,
      wins: 3,
      placementPoints: 61,
      eliminations: 88,
    },
    {
      rank: 4,
      name: "Gladiators Esports",
      points: 144,
      wins: 3,
      placementPoints: 46,
      eliminations: 98,
    },
    {
      rank: 5,
      name: "Team Outrage",
      points: 125,
      wins: 2,
      placementPoints: 42,
      eliminations: 83,
    },
    {
      rank: 6,
      name: "K9 Esports",
      points: 116,
      wins: 2,
      placementPoints: 36,
      eliminations: 80,
    },
    {
      rank: 7,
      name: "Daejeon Game PT",
      points: 112,
      wins: 0,
      placementPoints: 25,
      eliminations: 87,
    },
    {
      rank: 8,
      name: "Kinotrope Gaming",
      points: 95,
      wins: 0,
      placementPoints: 33,
      eliminations: 62,
    },
    {
      rank: 9,
      name: "Team 8BIT",
      points: 93,
      wins: 0,
      placementPoints: 27,
      eliminations: 66,
    },
    {
      rank: 10,
      name: "Blitz Esports × Epigrotive Gaming",
      points: 89,
      wins: 0,
      placementPoints: 30,
      eliminations: 59,
    },
    {
      rank: 11,
      name: "REIGNITE",
      points: 88,
      wins: 0,
      placementPoints: 38,
      eliminations: 50,
    },
    {
      rank: 12,
      name: "Team SouL",
      points: 87,
      wins: 0,
      placementPoints: 18,
      eliminations: 69,
    },
    {
      rank: 13,
      name: "FOCUS",
      points: 81,
      wins: 0,
      placementPoints: 26,
      eliminations: 55,
    },
    {
      rank: 14,
      name: "Making The Road",
      points: 75,
      wins: 0,
      placementPoints: 26,
      eliminations: 49,
    },
    {
      rank: 15,
      name: "Valor",
      points: 64,
      wins: 1,
      placementPoints: 21,
      eliminations: 43,
    },
    {
      rank: 16,
      name: "Versus",
      points: 23,
      wins: 0,
      placementPoints: 10,
      eliminations: 13,
    },
  ],
  "bmsd-2026": [
    {
      rank: 1,
      name: "Team SouL",
      points: 155,
      wins: 2,
      placementPoints: 52,
      eliminations: 103,
    },
    {
      rank: 2,
      name: "Gladiators Esports",
      points: 141,
      wins: 2,
      placementPoints: 58,
      eliminations: 83,
    },
    {
      rank: 3,
      name: "Team 8BIT",
      points: 140,
      wins: 3,
      placementPoints: 51,
      eliminations: 89,
    },
    {
      rank: 4,
      name: "K9 Esports",
      points: 135,
      wins: 2,
      placementPoints: 52,
      eliminations: 83,
    },
    {
      rank: 5,
      name: "Epigrotive Gaming",
      points: 133,
      wins: 2,
      placementPoints: 50,
      eliminations: 83,
    },
    {
      rank: 6,
      name: "Team Outrage",
      points: 123,
      wins: 1,
      placementPoints: 36,
      eliminations: 87,
    },
    {
      rank: 7,
      name: "VR1 Esports",
      points: 122,
      wins: 2,
      placementPoints: 39,
      eliminations: 83,
    },
    {
      rank: 8,
      name: "Welt Esports",
      points: 120,
      wins: 2,
      placementPoints: 45,
      eliminations: 75,
    },
    {
      rank: 9,
      name: "Meta Ninza",
      points: 113,
      wins: 0,
      placementPoints: 38,
      eliminations: 75,
    },
    {
      rank: 10,
      name: "Team Apex Gaming",
      points: 98,
      wins: 1,
      placementPoints: 39,
      eliminations: 59,
    },
    {
      rank: 11,
      name: "Revenant XSpark",
      points: 89,
      wins: 1,
      placementPoints: 19,
      eliminations: 70,
    },
    {
      rank: 12,
      name: "Myth Official",
      points: 88,
      wins: 0,
      placementPoints: 24,
      eliminations: 64,
    },
    {
      rank: 13,
      name: "Wyld Fangs",
      points: 85,
      wins: 0,
      placementPoints: 21,
      eliminations: 64,
    },
    {
      rank: 14,
      name: "Nebula Esports",
      points: 83,
      wins: 0,
      placementPoints: 23,
      eliminations: 60,
    },
    {
      rank: 15,
      name: "GodLike Esports",
      points: 68,
      wins: 0,
      placementPoints: 15,
      eliminations: 53,
    },
    {
      rank: 16,
      name: "Genesis Esports",
      points: 67,
      wins: 0,
      placementPoints: 14,
      eliminations: 53,
    },
  ],
  "bgms-2026": [
    {
      rank: 1,
      name: "Nebula Esports",
      points: 210,
      wins: 4,
      placementPoints: 66,
      eliminations: 116,
    },
    {
      rank: 2,
      name: "Gladiators Esports",
      points: 189,
      wins: 4,
      placementPoints: 62,
      eliminations: 114,
    },
    {
      rank: 3,
      name: "Orangutan",
      points: 187,
      wins: 3,
      placementPoints: 46,
      eliminations: 120,
    },
    {
      rank: 4,
      name: "Rapid Chaos Esports",
      points: 170,
      wins: 1,
      placementPoints: 57,
      eliminations: 93,
    },
    {
      rank: 5,
      name: "Team Apex Gaming",
      points: 163,
      wins: 1,
      placementPoints: 43,
      eliminations: 90,
    },
    {
      rank: 6,
      name: "Reckoning Esports",
      points: 153,
      wins: 1,
      placementPoints: 58,
      eliminations: 82,
    },
    {
      rank: 7,
      name: "Team Tamilas",
      points: 136,
      wins: 1,
      placementPoints: 38,
      eliminations: 76,
    },
    {
      rank: 8,
      name: "Team SouL",
      points: 136,
      wins: 1,
      placementPoints: 29,
      eliminations: 79,
    },
    {
      rank: 9,
      name: "Genesis Esports",
      points: 135,
      wins: 0,
      placementPoints: 23,
      eliminations: 92,
    },
    {
      rank: 10,
      name: "Revenant XSpark",
      points: 131,
      wins: 1,
      placementPoints: 19,
      eliminations: 85,
    },
    {
      rank: 11,
      name: "Team 8BIT",
      points: 126,
      wins: 1,
      placementPoints: 18,
      eliminations: 74,
    },
    {
      rank: 12,
      name: "Elite Nova Esports",
      points: 120,
      wins: 0,
      placementPoints: 28,
      eliminations: 78,
    },
    {
      rank: 13,
      name: "7Gods Esports",
      points: 116,
      wins: 0,
      placementPoints: 25,
      eliminations: 65,
    },
    {
      rank: 14,
      name: "Team Outrage",
      points: 102,
      wins: 0,
      placementPoints: 22,
      eliminations: 66,
    },
    {
      rank: 15,
      name: "Wyld Fangs",
      points: 93,
      wins: 0,
      placementPoints: 18,
      eliminations: 67,
    },
    {
      rank: 16,
      name: "Myth Official",
      points: 84,
      wins: 0,
      placementPoints: 24,
      eliminations: 49,
    },
  ],
  "bmps-2026": [
    {
      rank: 1,
      name: "GodLike Esports",
      points: 162,
      wins: 2,
      placementPoints: 58,
      eliminations: 104,
    },
    {
      rank: 2,
      name: "Divine Gaming",
      points: 152,
      wins: 2,
      placementPoints: 56,
      eliminations: 96,
    },
    {
      rank: 3,
      name: "Victores Sumus",
      points: 133,
      wins: 2,
      placementPoints: 54,
      eliminations: 79,
    },
    {
      rank: 4,
      name: "Gods Reign",
      points: 128,
      wins: 2,
      placementPoints: 43,
      eliminations: 85,
    },
    {
      rank: 5,
      name: "Team Apex Gaming",
      points: 123,
      wins: 2,
      placementPoints: 28,
      eliminations: 95,
    },
    {
      rank: 6,
      name: "Orangutan",
      points: 119,
      wins: 1,
      placementPoints: 41,
      eliminations: 78,
    },
    {
      rank: 7,
      name: "Team Tamilas",
      points: 116,
      wins: 1,
      placementPoints: 38,
      eliminations: 78,
    },
    {
      rank: 8,
      name: "Vasista Esports",
      points: 113,
      wins: 2,
      placementPoints: 37,
      eliminations: 76,
    },
    {
      rank: 9,
      name: "Reckoning Esports",
      points: 111,
      wins: 2,
      placementPoints: 43,
      eliminations: 68,
    },
    {
      rank: 10,
      name: "Nebula Esports",
      points: 107,
      wins: 1,
      placementPoints: 34,
      eliminations: 73,
    },
    {
      rank: 11,
      name: "Team 8BIT",
      points: 103,
      wins: 0,
      placementPoints: 30,
      eliminations: 73,
    },
    {
      rank: 12,
      name: "Genesis Esports",
      points: 99,
      wins: 0,
      placementPoints: 29,
      eliminations: 70,
    },
    {
      rank: 13,
      name: "Team SouL",
      points: 96,
      wins: 1,
      placementPoints: 30,
      eliminations: 66,
    },
    {
      rank: 14,
      name: "7Gods Esports",
      points: 95,
      wins: 1,
      placementPoints: 31,
      eliminations: 64,
    },
    {
      rank: 15,
      name: "Revenant XSpark",
      points: 86,
      wins: 0,
      placementPoints: 19,
      eliminations: 67,
    },
    {
      rank: 16,
      name: "Myth Official",
      points: 63,
      wins: 0,
      placementPoints: 13,
      eliminations: 50,
    },
  ],
};

for (const item of tournaments.filter(
  (entry) =>
    entry.isArchiveEdition && entry.winner && !tournamentStandings[entry.id],
)) {
  tournamentStandings[item.id] = [item.winner, item.runnerUp, item.thirdPlace]
    .filter((name): name is string => Boolean(name))
    .map((name, index) => ({ rank: index + 1, name }));
}

export const tournamentPrizes: Record<string, TournamentPrize[]> = {
  "cegc-2025": [
    { place: "1st · Team SouL", amount: "₹21,50,000" },
    { place: "2nd · True Rippers", amount: "₹11,00,000" },
    { place: "3rd · Gods Reign", amount: "₹5,00,000" },
    { place: "4th · Victores Sumus", amount: "₹2,85,000" },
    { place: "5th · Revenant XSpark", amount: "₹2,25,000" },
    { place: "6th · Welt Esports", amount: "₹2,00,000" },
    { place: "7th · NoNx Esports", amount: "₹1,60,000" },
    { place: "8th · FS Esports", amount: "₹1,30,000" },
    { place: "9th · Vasista Esports", amount: "₹50,000" },
    { place: "10th · 8Bit", amount: "₹50,000" },
    { place: "Finals MVP · Hydro", amount: "₹50,000" },
    { place: "Best IGL · NakuL", amount: "₹50,000" },
    { place: "WWCD award · Team SouL", amount: "₹50,000" },
  ],
  "bmic-2026": [
    { place: "1st · Nongshim Redforce", amount: "₹30,00,000" },
    { place: "2nd · DRX", amount: "₹15,00,000" },
    { place: "3rd · Dplus", amount: "₹10,00,000" },
    { place: "4th · Gladiators Esports", amount: "₹7,50,000" },
    { place: "5th · Team Outrage", amount: "₹6,25,000" },
    { place: "6th · K9 Esports", amount: "₹4,50,000" },
    { place: "7th · Daejeon Game PT", amount: "₹3,75,000" },
    { place: "8th · Kinotrope Gaming", amount: "₹3,75,000" },
    { place: "9th · 8BIT", amount: "₹2,50,000" },
    { place: "10th · Blitz Esports × Epigrotive Gaming", amount: "₹2,50,000" },
    { place: "Google Play MVP · XZY", amount: "₹2,50,000" },
    { place: "Best IGL · SOEZ", amount: "₹1,25,000" },
    { place: "Best Clutch · Taurus", amount: "₹1,00,000" },
  ],
  "bmsd-2026": [
    { place: "1st · Team SouL", amount: "₹30,00,000" },
    { place: "2nd · Gladiators Esports", amount: "₹15,00,000" },
    { place: "3rd · Team 8BIT", amount: "₹10,00,000" },
    { place: "4th · K9 Esports", amount: "₹7,50,000" },
    { place: "5th · Epigrotive Gaming", amount: "₹6,25,000" },
    { place: "6th · Team Outrage", amount: "₹4,50,000" },
    { place: "7th · VR1 Esports", amount: "₹3,75,000" },
    { place: "8th · Welt Esports", amount: "₹3,75,000" },
    { place: "9th · Meta Ninza", amount: "₹2,50,000" },
    { place: "10th · Team Tamilas", amount: "₹2,50,000" },
    { place: "Tournament MVP · Shubh", amount: "₹2,00,000" },
    { place: "Finals MVP · LEGIT", amount: "₹1,00,000" },
    { place: "Best IGL · Areeb", amount: "₹75,000" },
    { place: "Best Clutch · Harsh", amount: "₹50,000" },
    { place: "Grenadier · LEGIT", amount: "₹75,000" },
  ],
  "bgms-2026": [
    { place: "1st · Nebula Esports", amount: "₹40,00,000" },
    { place: "2nd · Gladiators Esports", amount: "₹15,00,000" },
    { place: "3rd · Orangutan", amount: "₹6,00,000" },
    { place: "4th · Rapid Chaos Esports", amount: "₹4,50,000" },
    { place: "5th · Team Apex Gaming", amount: "₹3,50,000" },
    { place: "6th · Reckoning Esports", amount: "₹3,00,000" },
    { place: "7th · Team Tamilas", amount: "₹2,50,000" },
    { place: "8th · Team SouL", amount: "₹2,30,000" },
    { place: "9th · Genesis Esports", amount: "₹2,00,000" },
    { place: "10th · Revenant XSpark", amount: "₹1,80,000" },
    { place: "Finals MVP · KnowMe", amount: "Award" },
    { place: "Most Wicked Player · HunterZ", amount: "Award" },
  ],
  "bmps-2026": [
    { place: "1st · GodLike Esports", amount: "₹1,00,00,000" },
    { place: "2nd · Divine Gaming", amount: "₹60,00,000" },
    { place: "3rd · Victores Sumus", amount: "₹40,00,000" },
    { place: "4th · Gods Reign", amount: "₹30,00,000" },
    { place: "5th · Team Apex Gaming", amount: "₹25,00,000" },
    { place: "6th · Orangutan", amount: "₹18,00,000" },
    { place: "7th · Team Tamilas", amount: "₹15,00,000" },
    { place: "8th · Vasista Esports", amount: "₹14,50,000" },
    { place: "9th · Reckoning Esports", amount: "₹10,00,000" },
    { place: "10th · Nebula Esports", amount: "₹10,00,000" },
  ],
};

// Verified finalist fields and placements for archive editions with published records.
tournamentParticipants["bmic-2025"] = makeParticipants(
  [
    "DRX",
    "True Rippers",
    "CAG Osaka",
    "Nebula Esports",
    "Nongshim RedForce",
    "Dplus",
    "MYSTERIOUS 4",
    "K9 Esports",
    "Team SouL",
    "Orangutan",
    "Jecheon Phalanx",
    "REIGNITE",
    "Madkings Esports",
    "MAKING THE ROAD",
    "Gods Reign",
    "REJECT",
  ],
  "Grand Finals",
);
tournamentParticipants["inkr-2023"] = makeParticipants(
  [
    "Dplus",
    "Gods Reign",
    "emTek StormX",
    "Blind Esports",
    "Revenant Esports",
    "Eagle Owls",
    "Gladiators Esports",
    "Nongshim RedForce",
    "TWM",
    "Medal Esports",
    "zz",
    "DUKSAN Esports",
    "ROX",
    "BIG BROTHER ESPORTS",
    "Maru Gaming",
    "Team XSpark",
  ],
  "Invited teams",
);
tournamentParticipants["bgis-2024"] = makeParticipants(
  [
    "Team XSpark",
    "Global Esports",
    "Reckoning Esports",
    "Team SouL",
    "Venom Gaming",
    "Team Limra",
    "8Bit",
    "Team Tamilas",
    "Raven Esports",
    "FS Esports",
    "TEAM iNSANE",
    "Team Aaru",
    "Vasista Esports",
    "MOGO Esports",
    "Carnival Gaming",
    "Inferno Squad",
  ],
  "Grand Finals",
);
tournamentStandings["bmic-2025"] = [
  { rank: 1, name: "DRX", points: 166 },
  { rank: 2, name: "True Rippers", points: 137 },
  { rank: 3, name: "CAG Osaka", points: 136 },
  { rank: 4, name: "Nebula Esports", points: 127 },
];
tournamentPrizes["bmic-2025"] = [
  { place: "1st · DRX", amount: "₹30,00,000" },
  { place: "2nd · True Rippers", amount: "₹15,00,000" },
  { place: "3rd · CAG Osaka", amount: "₹10,00,000" },
  { place: "4th · Nebula Esports", amount: "₹7,50,000" },
  { place: "5th · Nongshim RedForce", amount: "₹6,25,000" },
  { place: "6th · Dplus", amount: "₹4,50,000" },
  { place: "7th · MYSTERIOUS 4", amount: "₹3,75,000" },
  { place: "8th · K9 Esports", amount: "₹3,75,000" },
  { place: "9th · Team SouL", amount: "₹2,50,000" },
  { place: "10th · Orangutan", amount: "₹2,50,000" },
  { place: "11th · Jecheon Phalanx", amount: "₹2,00,000" },
  { place: "12th · REIGNITE", amount: "₹2,00,000" },
  { place: "13th · Madkings Esports", amount: "₹1,50,000" },
  { place: "14th · MAKING THE ROAD", amount: "₹1,50,000" },
  { place: "15th · Gods Reign", amount: "₹1,25,000" },
  { place: "16th · REJECT", amount: "₹1,25,000" },
  { place: "MVP · HYUNBIN", amount: "₹2,50,000" },
  { place: "Best IGL · Qx", amount: "₹1,25,000" },
  { place: "Best Clutch · HEROO", amount: "₹1,00,000" },
];
tournamentPrizes["bgis-2024"] = [
  { place: "1st · Team XSpark", amount: "₹60,00,000" },
  { place: "2nd · Global Esports", amount: "₹30,00,000" },
  { place: "3rd · Reckoning Esports", amount: "₹20,00,000" },
  { place: "4th · Team SouL", amount: "₹15,00,000" },
  { place: "5th · Venom Gaming", amount: "₹12,50,000" },
  { place: "6th · Team Limra", amount: "₹10,00,000" },
  { place: "7th · 8Bit", amount: "₹9,00,000" },
  { place: "8th · Team Tamilas", amount: "₹8,00,000" },
  { place: "9th · Raven Esports", amount: "₹6,00,000" },
  { place: "10th · FS Esports", amount: "₹6,00,000" },
];

export const articles: Article[] = [
  {
    id: "google-play-arena-launch",
    title:
      "Google and NODWIN Gaming Launch 'Google Play Arena' Featuring MS Dhoni's Mahi Clutchers",
    category: "INDIA · MULTI-GAME",
    date: "Oct 23, 2026",
    readTime: "4 min read",
    summary:
      "Google Play and NODWIN Gaming announced a multi-phase, multi-title championship with open registrations and a grassroots team led by MS Dhoni. Featured games include BGMI, Free Fire MAX, Real Cricket, Chess and EA SPORTS FC Mobile.",
    sourceUrl: `${esportStats}/news/google-play-arena-nodwin-gaming-ms-dhoni-mahi-clutchers`,
    sourceLabel: "eSportStats",
  },
  {
    id: "bgmi-survivor-league",
    title:
      "KRAFTON India Launches BGMI Survivor League, Putting Fans in Charge of a ₹70 Lakh Prize Pool",
    category: "BGMI · COMMUNITY",
    date: "Oct 22, 2026",
    readTime: "4 min read",
    summary:
      "The 30-day creator competition runs through Nov 17. Fans join a creator in BGMI and earn leaderboard points through daily play and in-game missions.",
    sourceUrl: `${esportStats}/news/krafton-india-bgmi-survivor-league-50-creators-announcement`,
    sourceLabel: "eSportStats",
  },
  {
    id: "bmic-international",
    title:
      "BMIC 2026: India, Korea, and Japan Clash for ₹1 Crore and PMGC Spots",
    category: "BGMI · INTERNATIONAL",
    date: "Oct 20, 2026",
    readTime: "5 min read",
    summary:
      "The 16-team international LAN tournament brought teams from India, South Korea and Japan to Mumbai, with PMGC qualification at stake.",
    sourceUrl: `${esportStats}/news/bmic-2026-teams-format-pmgc-stakes`,
    sourceLabel: "eSportStats",
  },
  {
    id: "ewc-qualifiers-2027",
    title:
      "Esports World Cup Announces 2027 Qualifier Program, Expanding Global Pathways",
    category: "GLOBAL ESPORTS",
    date: "Oct 20, 2026",
    readTime: "4 min read",
    summary:
      "The Road to EWC qualifier program connects established circuits and local organizers with a global championship pathway for 2027.",
    sourceUrl: `${esportStats}/news/esports-world-cup-ewc-2027-qualifier-program-announcement`,
    sourceLabel: "eSportStats",
  },
  {
    id: "soul-bmsd-champions",
    title:
      "Team SouL Crowned Champions of BMSD 2026, Secure Global Qualifications at PMGC",
    category: "BGMI · RESULTS",
    date: "Oct 20, 2026",
    readTime: "4 min read",
    summary:
      "Team SouL made up a 28-point deficit on the final day and finished the BMSD Grand Finals with 155 points. LEGIT earned Finals MVP.",
    sourceUrl: `${esportStats}/news/team-soul-crowned-bmsd-2026-champions`,
    sourceLabel: "eSportStats",
  },
];

export const events: Event[] = [
  {
    id: "battlin-open-track-1",
    day: "15",
    month: "NOV",
    title: "Battlin Open Season 1 · Track 1",
    meta: "BGMI · Prize pool $5,267",
    sourceUrl: charts,
  },
  {
    id: "pmgc-2026",
    day: "23–13",
    month: "NOV–DEC",
    title: "PUBG Mobile Global Championship",
    meta: "PUBG Mobile · Turkey · $3M",
    sourceUrl: `${esportStats}/tournaments`,
  },
  {
    id: "jioblast-gully-wars",
    day: "27–29",
    month: "NOV",
    title: "JioBLAST Gully Wars",
    meta: "BGMI · Prize pool $10,386",
    sourceUrl: charts,
  },
  {
    id: "battlin-open-track-2",
    day: "27–29",
    month: "NOV",
    title: "Battlin Open Season 1 · Track 2",
    meta: "BGMI · Prize pool $15,800",
    sourceUrl: charts,
  },
  {
    id: "cegc-2026",
    day: "11–13",
    month: "DEC",
    title: "CEGC 2026 · Grand Finals",
    meta: "BGMI · Chennai · ₹75 lakh purse",
    sourceUrl: charts,
  },
  {
    id: "google-play-arena-2026",
    day: "14–20",
    month: "DEC",
    title: "Google Play Arena BGMI",
    meta: "BGMI · 16 teams · ₹28 lakh purse",
    sourceUrl: `${amaze}/bgmi/tournaments/google-play-arena-bgmi`,
  },
];
