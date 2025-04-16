export type GameStatus = "todo" | "in-progress" | "completed";

export interface Game {
  // ...existing fields
  comment?: string;
  id: string; // unique identifier
  name: string;
  note?: string; // e.g., "8/10"
  category?: string; // e.g., "Mario", "Zelda"
  console: string[]; // e.g., ["Switch", "Gamecube"]
  status: GameStatus;
  coverUrl?: string; // scraped from API
  personalRating?: string; // e.g., "8/10"
}
