export type BgisTeam = {
  name: string;
  stage: "Quarter Finals" | "Wildcard";
  roster: string[];
};
export type BgisResult = { rank: number; team: string; points: number };

export const bgisOverview = {
  series: "Battlegrounds Mobile India Series",
  organizer: "KRAFTON · Tesseract Esports",
  device: "iPhone 16 Pro",
  game: "Battlegrounds Mobile India",
  mode: "Squads TPP",
  type: "Online & Offline",
  locations: "Chennai · Hyderabad, India",
  venues:
    "Chennai Trade Centre (Grand Finals) · Sandhya Convention Center (Semi Finals & Survival Stage)",
  prize: "₹4,00,00,000",
  dates: "Jan 26 – Mar 29, 2026",
  tier: "A-Tier",
  teams: 24,
  tagline: "Break Boundaries",
  summary:
    "The fifth edition of the Battlegrounds Mobile India Series, organized by KRAFTON, with 24 teams competing across the national circuit.",
};

export const bgisStages = [
  {
    name: "Round 1",
    dates: "Jan 26 – Feb 1",
    venue: "Online · 1,024 teams",
    details:
      "1,016 teams from In-Game Qualifiers and the bottom eight from The Grind Group D. Teams are split into 64 groups of 16 and play six matches each. The top seven from every group plus the next 48 teams qualify for Round 2 (496 teams total).",
  },
  {
    name: "Round 2",
    dates: "Feb 5 – Feb 8",
    venue: "Online · 512 teams",
    details:
      "496 teams from Round 1 join the top eight from The Grind Group D and bottom eight from Group C. Teams are split into 32 groups of 16 and play six matches each. The top seven from every group plus the next 16 teams (240 total) qualify for Round 3.",
  },
  {
    name: "Round 3",
    dates: "Feb 12 – Feb 15",
    venue: "Online · 256 teams",
    details:
      "240 teams from Round 2 join the top eight from The Grind Group C and bottom eight from Group B. Teams are split into 16 groups of 16 and play six matches each. The top six from every group plus the next 16 teams (112 total) qualify for Round 4.",
  },
  {
    name: "Round 4",
    dates: "Feb 19 – Feb 22",
    venue: "Online · 128 teams",
    details:
      "112 teams from Round 3 join the top eight from The Grind Group B and bottom eight from Group A. Teams are split into eight groups of 16 and play six matches each. The top seven from each group advance to Quarter Finals; the next eight teams enter Wildcard.",
  },
  {
    name: "Quarter Finals",
    dates: "Feb 26 – Mar 1",
    venue: "Online · 64 teams",
    details:
      "56 teams from Round 4 join the top eight from The Grind Group A. Four groups of 16 play six matches each. The top 16 teams advance to Semi Finals; teams ranked 17th–40th enter Wildcard.",
  },
  {
    name: "Wildcard",
    dates: "Mar 5 – Mar 8",
    venue: "Online · 32 teams",
    details:
      "24 teams from Quarter Finals join eight teams from Round 4. Four groups of eight play a round-robin schedule of 12 matches per team. The top eight teams advance to Semi Finals.",
  },
  {
    name: "Semi Finals",
    dates: "Mar 12 – Mar 15",
    venue: "Sandhya Convention Center · Hyderabad · 24 teams",
    details:
      "Sixteen teams from Quarter Finals and eight from Wildcard are divided into three groups of eight. Double round-robin; each team plays 16 matches. Top eight advance to Grand Finals; the remaining 16 proceed to Survival Stage.",
  },
  {
    name: "Survival Stage",
    dates: "Mar 16 – Mar 17",
    venue: "Sandhya Convention Center · Hyderabad · 16 teams",
    details:
      "Two matchdays and 12 matches. The top eight teams advance to Grand Finals.",
  },
  {
    name: "Grand Finals",
    dates: "Mar 27 – Mar 29",
    venue: "Chennai Trade Centre · Chennai · 16 teams",
    details:
      "Three matchdays and 18 matches. Eight teams qualify from Semi Finals and eight from Survival Stage.",
  },
];

export const bgisPlacementPoints = [
  ["1st", 10],
  ["2nd", 6],
  ["3rd", 5],
  ["4th", 4],
  ["5th", 3],
  ["6th", 2],
  ["7th–8th", 1],
  ["9th–16th", 0],
] as const;

export const bgisPrizePlaces = [
  ["Team SouL", 10_000_000],
  ["Genesis Esports", 5_000_000],
  ["Orangutan", 3_500_000],
  ["Victores Sumus", 2_500_000],
  ["GodLike Esports", 2_050_000],
  ["K9 Esports", 1_600_000],
  ["Revenant XSpark", 1_400_000],
  ["Wyld Fangs", 1_400_000],
  ["Vasista Esports", 1_150_000],
  ["Nebula Esports", 1_150_000],
  ["Learn From Past", 1_000_000],
  ["Meta Ninza", 1_000_000],
  ["Myth Official", 900_000],
  ["Reckoning Esports", 900_000],
  ["Team Tamilas", 800_000],
  ["Welt Esports", 800_000],
  ["EvoX Esports", 550_000],
  ["NoNx Esports", 550_000],
  ["Sinewy Esports", 500_000],
  ["Phoenix Esports", 500_000],
  ["Troy Tamilans Esports", 500_000],
  ["4Wolf x DoD", 500_000],
  ["Madkings Esports", 400_000],
  ["Vanguard Esports", 400_000],
] as const;

export const bgisAwards = [
  ["MVP", "HunterZ", "Genesis Esports", 300_000],
  ["Finals MVP", "LEGIT", "Team SouL", 150_000],
  ["Best IGL", "NakuL", "Team SouL", 200_000],
  ["Emerging Star", "Detrox", "Myth Official", 100_000],
  ["Best Clutch", "Termi", "Learn From Past", 100_000],
  ["Fan Favorite Team", "Team SouL", "Team SouL", 100_000],
] as const;

export const bgisFmvpRankings = [
  {
    rank: 1,
    player: "LEGIT",
    rating: "2.69",
    finishes: 38,
    damage: "7,346",
    survival: "21:38",
    knocks: 34,
  },
  {
    rank: 2,
    player: "HunterZ",
    rating: "2.66",
    finishes: 40,
    damage: "6,895",
    survival: "21:01",
    knocks: 29,
  },
  {
    rank: 3,
    player: "Pain09",
    rating: "2.59",
    finishes: 34,
    damage: "7,435",
    survival: "20:17",
    knocks: 40,
  },
  {
    rank: 4,
    player: "Goblin",
    rating: "2.51",
    finishes: 35,
    damage: "6,427",
    survival: "21:10",
    knocks: 38,
  },
  {
    rank: 5,
    player: "Mafia36",
    rating: "2.37",
    finishes: 33,
    damage: "6,472",
    survival: "21:53",
    knocks: 27,
  },
];

export const bgisIglRankings = [
  {
    rank: 1,
    player: "NakuL",
    rating: "1.78",
    avgPoints: "10.3",
    wwcd: 6,
    top5: 18,
    survival: "21:26",
  },
  {
    rank: 2,
    player: "GravityJOD",
    rating: "1.57",
    avgPoints: "9.3",
    wwcd: 5,
    top5: 16,
    survival: "20:43",
  },
  {
    rank: 3,
    player: "Honey",
    rating: "1.50",
    avgPoints: "7.0",
    wwcd: 3,
    top5: 17,
    survival: "20:21",
  },
  {
    rank: 4,
    player: "Aaru",
    rating: "1.46",
    avgPoints: "8.6",
    wwcd: 5,
    top5: 15,
    survival: "20:46",
  },
  {
    rank: 5,
    player: "ShaDow",
    rating: "1.46",
    avgPoints: "7.8",
    wwcd: 1,
    top5: 10,
    survival: "20:22",
  },
];

export const bgisParticipants: BgisTeam[] = [
  {
    name: "EvoX Esports",
    stage: "Quarter Finals",
    roster: ["Kaalan", "Evil", "ShaDow", "SpyOp", "Tonyy"],
  },
  {
    name: "Team SouL",
    stage: "Quarter Finals",
    roster: [
      "NakuL (Captain)",
      "Goblin",
      "LEGIT",
      "Jokerr",
      "Thunder",
      "Ayogi · Coach",
    ],
  },
  {
    name: "Meta Ninza",
    stage: "Quarter Finals",
    roster: [
      "Shadow7 (Captain)",
      "Fierce",
      "Apollo",
      "WhiteTiger",
      "Javin",
      "Osmium · Coach",
    ],
  },
  {
    name: "Orangutan",
    stage: "Quarter Finals",
    roster: [
      "Aaru (Captain)",
      "AK",
      "WizzGOD",
      "Attanki",
      "Prem · DNP",
      "Coruja · Coach",
    ],
  },
  {
    name: "4Wolf x DoD",
    stage: "Quarter Finals",
    roster: ["IMMORTAL", "AVNISHOP", "BHAALU (Captain)", "NooB", "PIXIEOP"],
  },
  {
    name: "Madkings Esports",
    stage: "Quarter Finals",
    roster: ["SHADOW (Captain)", "ClutchGod", "Syrax", "PRO"],
  },
  {
    name: "Sinewy Esports",
    stage: "Quarter Finals",
    roster: ["Moksh (Captain)", "Vishu99", "Ninjuu", "Rexboy", "NinjA"],
  },
  {
    name: "Genesis Esports",
    stage: "Quarter Finals",
    roster: ["ViPER", "GravityJOD (Captain)", "HunterZ", "FurY", "Zap"],
  },
  {
    name: "Team Tamilas",
    stage: "Quarter Finals",
    roster: ["MrIGL (Captain)", "Reaper", "FoxOP", "AIMGOD"],
  },
  {
    name: "Troy Tamilans",
    stage: "Quarter Finals",
    roster: ["Auxin", "Ayden", "Lens77", "Hesperos", "Jazzy"],
  },
  {
    name: "Vasista Esports",
    stage: "Quarter Finals",
    roster: ["Hector (Captain)", "Beast", "Saumay", "Shayaan", "FusionOP"],
  },
  {
    name: "GodLike Esports",
    stage: "Quarter Finals",
    roster: [
      "Manya (Captain)",
      "JONATHAN",
      "Spower",
      "ADMINO",
      "Godz",
      "Aurum",
    ],
  },
  {
    name: "Wyld Fangs",
    stage: "Quarter Finals",
    roster: ["SENSEI (Captain)", "SPRAYGOD", "Goten", "Kanha", "Sam999"],
  },
  {
    name: "RNTX",
    stage: "Quarter Finals",
    roster: [
      "Punkk (Captain)",
      "NinjaJOD",
      "Pain09",
      "Tracegod",
      "JDGamingYT",
      "EXPLICIT · Coach",
      "Ch1rag · Analyst",
    ],
  },
  {
    name: "Welt Esports",
    stage: "Quarter Finals",
    roster: [
      "GokulWNL (Captain)",
      "Proton",
      "Maxioso",
      "Shyam",
      "JustyOp",
      "VPIX · Coach",
    ],
  },
  {
    name: "Learn From Past",
    stage: "Quarter Finals",
    roster: ["Termi", "RushBoy", "MAX", "Honey (Captain)", "SHADOWW"],
  },
  {
    name: "Nebula Esports",
    stage: "Wildcard",
    roster: [
      "Aadi (Captain)",
      "Phoenix",
      "KnowMe",
      "KRATOS",
      "Ryu",
      "Proxy · Coach",
    ],
  },
  {
    name: "Vanguard Esports",
    stage: "Wildcard",
    roster: [
      "DreamS (Captain)",
      "Insidious",
      "Dionysus",
      "Crypto",
      "AnujTooOP",
    ],
  },
  {
    name: "NoNx Esports",
    stage: "Wildcard",
    roster: ["Anonymous (Captain)", "Arther", "AimGoD", "FAMEeeeee", "Rapido"],
  },
  {
    name: "K9 Esports",
    stage: "Wildcard",
    roster: [
      "Omega (Captain)",
      "Slug",
      "NinjaBoi",
      "Knight",
      "RyzenBOTX",
      "Amit · Coach",
    ],
  },
  {
    name: "Victores Sumus",
    stage: "Wildcard",
    roster: ["Owais (Captain)", "Mafia36", "VeNoM", "ScaryJod", "Sarang"],
  },
  {
    name: "Phoenix",
    stage: "Wildcard",
    roster: [
      "Saumraj (Captain)",
      "VipeR",
      "SIMP",
      "Smoker46",
      "Stranger",
      "Xypex · Coach",
    ],
  },
  {
    name: "Reckoning Esports",
    stage: "Wildcard",
    roster: ["Roman (Captain)", "Levi", "Lovish", "SahilOPAF", "Godx"],
  },
  {
    name: "Myth Official",
    stage: "Wildcard",
    roster: ["Harshil", "Lucifer", "Daddy", "Detrox (Captain)", "Aryton"],
  },
];

export const bgisSemiFinalGroups = {
  A: [
    "Wyld Fangs",
    "Myth Official",
    "Troy Tamilans Esports",
    "Reckoning Esports",
    "Nebula Esports",
    "Madkings Esports",
    "GodLike Esports",
    "EvoX Esports",
  ],
  B: [
    "Learn From Past",
    "Phoenix Esports",
    "4Wolf x DoD",
    "K9 Esports",
    "Sinewy Esports",
    "Orangutan",
    "Meta Ninza",
    "Genesis Esports",
  ],
  C: [
    "Welt Esports",
    "Team SouL",
    "Victores Sumus",
    "Vasista Esports",
    "NoNx Esports",
    "Vanguard Esports",
    "Revenant XSpark",
    "Team Tamilas",
  ],
};

export const bgisSemiFinalResults: BgisResult[] = [
  { rank: 1, team: "Team SouL", points: 172 },
  { rank: 2, team: "Orangutan", points: 150 },
  { rank: 3, team: "Genesis Esports", points: 143 },
  { rank: 4, team: "Learn From Past", points: 137 },
  { rank: 5, team: "Reckoning Esports", points: 129 },
  { rank: 6, team: "RNTX", points: 116 },
  { rank: 7, team: "Victores Sumus", points: 112 },
  { rank: 8, team: "Meta Ninza", points: 112 },
  { rank: 9, team: "Vasista Esports", points: 108 },
  { rank: 10, team: "NoNx Esports", points: 108 },
  { rank: 11, team: "GodLike Esports", points: 105 },
  { rank: 12, team: "Troy Tamilans", points: 104 },
  { rank: 13, team: "Myth Official", points: 103 },
  { rank: 14, team: "EvoX Esports", points: 101 },
  { rank: 15, team: "Nebula Esports", points: 89 },
  { rank: 16, team: "Team Tamilas", points: 88 },
  { rank: 17, team: "Wyld Fangs", points: 86 },
  { rank: 18, team: "Vanguard Esports", points: 84 },
  { rank: 19, team: "Phoenix", points: 77 },
  { rank: 20, team: "Sinewy Esports", points: 67 },
  { rank: 21, team: "K9 Esports", points: 65 },
  { rank: 22, team: "Welt Esports", points: 61 },
  { rank: 23, team: "Madkings Esports", points: 60 },
  { rank: 24, team: "4Wolf x DoD", points: 42 },
];

export const bgisSurvivalResults: BgisResult[] = [
  { rank: 1, team: "GodLike Esports", points: 108 },
  { rank: 2, team: "Welt Esports", points: 95 },
  { rank: 3, team: "Nebula Esports", points: 92 },
  { rank: 4, team: "Myth Official", points: 89 },
  { rank: 5, team: "Wyld Fangs", points: 86 },
  { rank: 6, team: "K9 Esports", points: 85 },
  { rank: 7, team: "Team Tamilas", points: 79 },
  { rank: 8, team: "Vasista Esports", points: 77 },
  { rank: 9, team: "EvoX Esports", points: 76 },
  { rank: 10, team: "NoNx Esports", points: 74 },
  { rank: 11, team: "Sinewy Esports", points: 64 },
  { rank: 12, team: "Phoenix", points: 63 },
  { rank: 13, team: "Troy Tamilans", points: 55 },
  { rank: 14, team: "4Wolf x DoD", points: 50 },
  { rank: 15, team: "Madkings Esports", points: 49 },
  { rank: 16, team: "Vanguard Esports", points: 46 },
];

export const bgisFinalResults: BgisResult[] = [
  { rank: 1, team: "Team SouL", points: 173 },
  { rank: 2, team: "Genesis Esports", points: 169 },
  { rank: 3, team: "Orangutan", points: 132 },
  { rank: 4, team: "Victores Sumus", points: 128 },
  { rank: 5, team: "GodLike Esports", points: 118 },
  { rank: 6, team: "K9 Esports", points: 117 },
  { rank: 7, team: "RNTX", points: 114 },
  { rank: 8, team: "Wyld Fangs", points: 112 },
  { rank: 9, team: "Vasista Esports", points: 103 },
  { rank: 10, team: "Nebula Esports", points: 100 },
  { rank: 11, team: "Learn From Past", points: 97 },
  { rank: 12, team: "Meta Ninza", points: 95 },
  { rank: 13, team: "Myth Official", points: 90 },
  { rank: 14, team: "Reckoning Esports", points: 89 },
  { rank: 15, team: "Team Tamilas", points: 81 },
  { rank: 16, team: "Welt Esports", points: 62 },
];

export const bgisMatchSchedule = [
  ...Array.from({ length: 6 }, (_, i) => ({
    day: "Mar 12",
    match: i + 1,
    time: ["15:30", "16:25", "17:15", "18:05", "18:50", "19:35"][i],
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    day: "Mar 13",
    match: i + 7,
    time: ["14:35", "15:20", "16:10", "17:00", "17:50", "18:40"][i],
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    day: "Mar 14",
    match: i + 13,
    time: ["14:30", "15:15", "15:50", "16:30", "17:10", "17:50"][i],
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    day: "Mar 15",
    match: i + 19,
    time: ["14:40", "15:20", "16:00", "16:45", "17:25", "18:05"][i],
  })),
];

export const bgisSurvivalMatchSchedule = [
  ...Array.from({ length: 6 }, (_, i) => ({
    day: "Mar 16",
    match: i + 1,
    time: ["14:33", "15:10", "15:50", "16:30", "17:10", "17:50"][i],
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    day: "Mar 17",
    match: i + 7,
    time: ["14:30", "15:10", "15:50", "16:30", "17:15", "17:50"][i],
  })),
];

export const bgisSemiFinalRotations = [
  ["1", "Erangel", "AB", "AC", "BC", "Miramar", "AB"],
  ["2", "Miramar", "AB", "AC", "BC", "Erangel", "AB"],
  ["3", "Rondo", "AB", "AC", "BC", "Miramar", "BC"],
  ["4", "Rondo", "BC", "AB", "AC", "Erangel", "BC"],
  ["5", "Miramar", "BC", "AB", "AC", "Miramar", "AC"],
  ["6", "Erangel", "BC", "AB", "AC", "Erangel", "AC"],
] as const;

export const bgisFinalMatchTimes = [
  ["Mar 27", ["13:55", "14:35", "15:15", "16:00", "16:40", "17:23"]],
  ["Mar 28", ["13:09", "13:47", "14:30", "15:10", "15:50", "16:35"]],
  ["Mar 29", ["13:20", "14:00", "14:45", "15:25", "16:05", "16:45"]],
] as const;
