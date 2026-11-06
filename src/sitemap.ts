import { articles, teams, tournaments } from "./data.ts";
import { playerProfiles } from "./data/players.ts";
import { canonicalBaseUrl } from "./seo-config.ts";

export function playerRouteSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getSitemapPaths(): string[] {
  return [
    "/",
    "/tournaments",
    "/teams",
    "/rankings",
    "/news",
    "/calendar",
    "/search",
    "/favorites",
    "/pickems",
    ...tournaments.map((item) => `/tournaments/${item.id}`),
    ...teams.map((item) => `/teams/${item.id}`),
    ...playerProfiles.map((item) => `/players/${playerRouteSlug(item.name)}`),
    ...articles.map((item) => `/news/${item.id}`),
  ];
}

export function sitemapRouteExists(path: string): boolean {
  if (
    [
      "/",
      "/tournaments",
      "/teams",
      "/rankings",
      "/news",
      "/calendar",
      "/search",
      "/favorites",
      "/pickems",
    ].includes(path)
  )
    return true;
  const [, section, id] = path.split("/");
  if (section === "tournaments")
    return tournaments.some((item) => item.id === id);
  if (section === "teams") return teams.some((item) => item.id === id);
  if (section === "news") return articles.some((item) => item.id === id);
  if (section === "players")
    return playerProfiles.some((item) => playerRouteSlug(item.name) === id);
  return false;
}

export function buildSitemapXml(): string {
  const urls = getSitemapPaths()
    .map((path) => `  <url><loc>${canonicalBaseUrl}${path}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
