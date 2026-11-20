// Base URL for bible data files.
// Set NEXT_PUBLIC_DATA_URL in .env.local to load data from a CDN, e.g.
// NEXT_PUBLIC_DATA_URL=https://your-cdn.com/bible-data
export const DATA_URL_BASE = process.env.NEXT_PUBLIC_DATA_URL || "";

/**
 * Builds the URL for a data file. Paths are written relative to the project
 * (`data/<folder>/<n>.json`). With a CDN configured, the `data/` prefix is
 * dropped because the files live at the root of the CDN bucket.
 */
export function getDataUrl(path: string): string {
  const cleanPath = path.replace(/^\//, "");

  if (!DATA_URL_BASE) return `/${cleanPath}`;

  const relative = cleanPath.replace(/^data\//, "");
  const base = DATA_URL_BASE.replace(/\/$/, "");
  return `${base}/${relative}`;
}
