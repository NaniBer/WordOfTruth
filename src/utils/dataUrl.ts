// Base URL for bible data files
// Set NEXT_PUBLIC_DATA_URL in your .env.local file
// Example: NEXT_PUBLIC_DATA_URL=https://your-cdn.com/bible-data
export const DATA_URL_BASE = process.env.NEXT_PUBLIC_DATA_URL || "";

// Helper to build data URLs
export function getDataUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  if (DATA_URL_BASE) {
    // Use external CDN
    const base = DATA_URL_BASE.endsWith("/") ? DATA_URL_BASE.slice(0, -1) : DATA_URL_BASE;
    return `${base}/${cleanPath}`;
  }
  
  // Use local data (for development)
  return `/${cleanPath}`;
}
