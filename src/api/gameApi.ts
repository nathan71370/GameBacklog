// RAWG API utility for fetching game covers
// Docs: https://api.rawg.io/docs/

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY || "YOUR_RAWG_API_KEY_HERE";

export async function fetchRawgCover(gameName: string): Promise<string | undefined> {
  if (!RAWG_API_KEY || RAWG_API_KEY === "YOUR_RAWG_API_KEY_HERE") {
    console.warn("RAWG API key not set. Please add VITE_RAWG_API_KEY to your .env file.");
    return undefined;
  }
  const url = `https://api.rawg.io/api/games?search=${encodeURIComponent(gameName)}&key=${RAWG_API_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return undefined;
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].background_image;
    }
    return undefined;
  } catch (err) {
    console.error("Failed to fetch RAWG cover:", err);
    return undefined;
  }
}
