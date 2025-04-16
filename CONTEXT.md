# Game Backlog Webapp – Developer Implementation Guide

---

## 1. Project Overview

**Goal:**
A beautiful, animated web application to manage your game backlog:

- List games you want to play, are playing, or have completed
- Scrape and display game covers
- Mark games as completed, in progress, or todo
- Filter by name, category, status, or console
- Modern UI/UX with smooth animations

---

## 2. Tech Stack

- **Frontend Framework:** React (with TypeScript)
- **Styling:** TailwindCSS 4.1
- **State Management:** React Context or Redux Toolkit
- **Animation:** Framer Motion
- **HTTP Requests:** Axios
- **Game Data API:** IGDB (Internet Game Database) or RAWG API (for game covers)
- **Build Tool:** Vite 5

**Optional:**
- PWA support for offline access
- LocalStorage/IndexedDB for persistence

---

## 3. Data Model

**Game Object Structure:**

```typescript
type GameStatus = "todo" | "in-progress" | "completed";

interface Game {
  id: string; // unique identifier
  name: string;
  note?: string; // e.g., "8/10"
  category?: string; // e.g., "Mario", "Zelda"
  console: string[]; // e.g., ["Switch", "Gamecube"]
  status: GameStatus;
  coverUrl?: string; // scraped from API
  personalRating?: string; // e.g., "8/10"
}
```
---

## 4. Features & Requirements

### 4.1. Core Features

- **Game List:**
  - Display all games as cards with cover images
  - Group/filter by status (todo, in-progress, completed)
  - Filter/search by name, category, console
- **Game Status Management:**
  - Mark games as completed, in progress, or todo
  - Edit game details (note, rating, etc.)
- **Game Cover Scraping:**
  - Automatically fetch cover images from IGDB or RAWG based on game name
  - Fallback to a default image if unavailable
- **UI/UX:**
  - Responsive layout (mobile & desktop)
  - Smooth animations for transitions, card flips, status changes
  - Modern, clean, and visually appealing design
- **Persistence:**
  - Store data in LocalStorage or IndexedDB
  - Optionally sync with Google Drive/Dropbox for backup

### 4.2. Optional Features

- User Authentication (for cloud sync)
- Progress Stats: Show % completed, charts, etc.
- Export/Import: CSV/Excel support

---

## 5. Step-by-Step Implementation

### Step 1: Project Setup
- Initialize project with Vite or CRA (React + TypeScript)
- Install dependencies:
  - react, react-dom, typescript
  - tailwindcss 4.1
  - framer-motion
  - axios
  - uuid (for unique IDs)

### Step 2: Parse & Import Game Data
- Convert your Excel data to JSON (manual or script)
- Create a script to import and normalize the data into the Game structure
- Store initial data in a local JSON file or seed LocalStorage

### Step 3: UI Design
- Design wireframes for:
  - Game card grid/list
  - Filters/search bar
  - Status toggles (e.g., drag-and-drop, buttons, dropdown)
  - Game edit modal/dialog
- Implement responsive layout using Tailwind or Styled Components

### Step 4: Game List Component
- Render games as cards, showing cover, name, status, console, rating
- Use Framer Motion for card animations and transitions

### Step 5: Filtering & Searching
- Implement text search (by name)
- Filter by:
  - Status (tabs or dropdown)
  - Category (e.g., Mario, Zelda)
  - Console (multi-select or dropdown)

### Step 6: Status Management
- Allow marking games as completed, in progress, or todo
- Animate status changes (e.g., card highlight, confetti for completed)

### Step 7: Game Cover Scraping
- Integrate with IGDB or RAWG API:
  - On game add/import, query API for cover image
  - Store cover URL in game object
  - Use fallback image if not found
- **Note:** IGDB requires OAuth (Twitch), RAWG is easier for public use

### Step 8: Persistence
- Save all changes to LocalStorage or IndexedDB
- On app load, hydrate state from storage

### Step 9: Polish & Animations
- Add subtle animations to:
  - Card hover/focus
  - List transitions (filtering, adding/removing)
  - Status changes
- Ensure accessibility (keyboard nav, ARIA labels)

### Step 10: Optional Enhancements
- Add stats dashboard (completion % per console/category)
- Export/import data (CSV/Excel)
- PWA support for offline use

---

## 6. Example Directory Structure

```plaintext
/src
  /components
    GameCard.tsx
    GameList.tsx
    FilterBar.tsx
    StatusToggle.tsx
    GameEditModal.tsx
  /api
    gameApi.ts
  /utils
    dataParser.ts
    storage.ts
  /types
    Game.ts
  App.tsx
  index.tsx
  styles.css
```

---

## 7. External API Integration

### IGDB (Recommended for Covers)
- Register for a Twitch Developer account
- Get Client ID and OAuth token
- Use IGDB API to fetch game covers by name

**Example query:**
```http
POST https://api.igdb.com/v4/games
Headers: Client-ID, Authorization: Bearer <token>
Body: fields name,cover.url; search "<game name>";
```
- Parse and store `cover.url` in your game object

### RAWG (Alternative, easier, no auth)
- Register and get API key

**Example query:**
```http
GET https://api.rawg.io/api/games?search=<game name>&key=<API_KEY>
```
- Use `background_image` as cover

---

## 8. UI/UX Inspiration

- Use glassmorphism or neumorphism for cards
- Animated status badges (e.g., color-coded chips)
- Animated filters (slide in/out)
- Responsive grid (Masonry or Flexbox)
- Smooth modal transitions

---

## 9. Development Tips

- Use TypeScript for type safety
- Modularize components for reusability
- Use React Context or Redux for global state (games, filters)
- Debounce API calls for search/cover scraping
- Optimize images (lazy load, cache)

---

## 10. Deployment

- Deploy on Vercel, Netlify, or GitHub Pages
- Ensure environment variables for API keys are secure
- Provide README with setup instructions

---

## 11. Resources

- [IGDB API Docs](https://api-docs.igdb.com/)
- [RAWG API Docs](https://api.rawg.io/docs/)
- [Framer Motion](https://www.framer.com/motion/)
- [TailwindCSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)

---

## 12. Example User Stories

- As a user, I can view my backlog as a beautiful grid of game covers.
- As a user, I can mark a game as completed, in progress, or todo.
- As a user, I can filter my games by name, status, category, or console.
- As a user, I see animated transitions when I change filters or update a game’s status.
- As a user, I can edit game details and see my notes and ratings.

---

## 13. Appendix: Data Import

Provide a script or manual instructions to convert your Excel data to the required JSON format for the app.

---

This guide should enable any developer to understand, architect, and build the Game Backlog webapp from scratch.

If you need a sample JSON or further breakdown of any step, let me know!