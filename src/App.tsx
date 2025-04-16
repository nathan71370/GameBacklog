import "./App.css";
import FilterBar from "./components/FilterBar";
import StatusToggle from "./components/StatusToggle";
import GameList from "./components/GameList";
import GameEditModal from "./components/GameEditModal";
import EndGameModal from "./components/EndGameModal";
import ConfirmModal from "./components/ConfirmModal";

import { Game, GameStatus } from "./types/Game";
import { fetchRawgCover } from "./api/gameApi";

import { useState, useMemo, useEffect } from "react";

function App() {
  // Initialize console list in localStorage from games if not present
  useEffect(() => {
    const savedConsoles = localStorage.getItem("consoles");
    if (!savedConsoles) {
      // Get all unique consoles from games
      const savedGames = localStorage.getItem("games");
      let gamesArr: any[] = [];
      try {
        gamesArr = savedGames ? JSON.parse(savedGames) : [];
      } catch {
        gamesArr = [];
      }
      const allConsoles = gamesArr.flatMap((g: any) => g.console)
        .flatMap((c: string) => c.split(",").map((x: string) => x.trim()))
        .filter(Boolean);
      const uniqueConsoles = Array.from(new Set(allConsoles)).sort();
      localStorage.setItem("consoles", JSON.stringify(uniqueConsoles));
    }
  }, []);

  // Handler to add a game
  const handleAddGame = async (game: { name: string; console: string[]; status: string; personalRating?: string; comment?: string }) => {
    // Generate unique id
    const id = Math.random().toString(36).slice(2, 10);
    // Fetch cover
    const coverUrl = await fetchRawgCover(game.name);
    setGames((prev) => {
      const updatedGames = [
        ...prev,
        { ...game, id, status: game.status as GameStatus, coverUrl: coverUrl || "/default-cover.png" }
      ];
      syncConsolesToLocalStorage(updatedGames);
      return updatedGames;
    });
  };

  // Handler to import games (update consoles too)
  const handleImportGames = (importedGames: Game[]) => {
    setGames(importedGames);
    syncConsolesToLocalStorage(importedGames);
  };

  // Helper to sync consoles to localStorage from a list of games
  const syncConsolesToLocalStorage = (gamesList: Game[]) => {
    const allConsoles = gamesList
      .flatMap((g) => Array.isArray(g.console) ? g.console : (typeof g.console === 'string' ? [g.console] : []))
      .map((c) => c.trim())
      .filter(Boolean);
    const uniqueConsoles = Array.from(new Set(allConsoles)).sort();
    localStorage.setItem("consoles", JSON.stringify(uniqueConsoles));
  };

  // Importing state for JSON import loading
  const [importing, setImporting] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return stored === "true";
      // System preference fallback
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    console.log("[DarkMode Effect] Setting dark mode:", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
    console.log("[DarkMode Effect] html.classList:", document.documentElement.classList.value);
  }, [darkMode]);

  // Game state
  const [games, setGames] = useState<Game[]>(() => {
    const saved = localStorage.getItem("games");
    return saved ? JSON.parse(saved) : [];
  });

  // Filter/search state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<GameStatus | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [consoleFilter, setConsoleFilter] = useState<string | undefined>(undefined);

  // Compute unique categories from games
  const categories = useMemo(
    () => Array.from(new Set(games.map((g) => g.category).filter(Boolean))) as string[],
    [games]
  );

  // Get consoles from localStorage
  const consoles = useMemo(() => {
    const stored = localStorage.getItem("consoles");
    return stored ? JSON.parse(stored) : [];
  }, [games]); // update when games change (import/add/delete)

  // Filter games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !status || game.status === status;
      const matchesCategory = !category || game.category === category;
      const matchesConsole = !consoleFilter || game.console.includes(consoleFilter);
      return matchesSearch && matchesStatus && matchesCategory && matchesConsole;
    });
  }, [games, search, status, category, consoleFilter]);

  // Persist games to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  // Handler to update a game's status
  const handleStatusChange = (id: string, newStatus: GameStatus) => {
    setGames((prev) => prev.map((g) => g.id === id ? { ...g, status: newStatus } : g));
  };

  // Handler to delete a game
  const handleDeleteGame = (id: string) => {
    setGames((prev) => prev.filter((g) => g.id !== id));
    // Persist immediately
    setTimeout(() => {
      localStorage.setItem("games", JSON.stringify(games.filter((g) => g.id !== id)));
    }, 0);
  };

  // Handler to edit a comment
  const handleEditComment = (id: string, comment: string) => {
    setGames((prev) => prev.map((g) => g.id === id ? { ...g, comment } : g));
    // Persist immediately
    setTimeout(() => {
      localStorage.setItem("games", JSON.stringify(games.map((g) => g.id === id ? { ...g, comment } : g)));
    }, 0);
  };
  
  // Modal state for ending a game
  const [endGameModal, setEndGameModal] = useState<{ open: boolean; gameId?: string }>({ open: false });
  // Modal state for restart confirmation
  const [restartModal, setRestartModal] = useState<{ open: boolean; gameId?: string }>({ open: false });

  // Handler to open end game modal
  const handleOpenEndGameModal = (gameId: string) => {
    setEndGameModal({ open: true, gameId });
  };
  // Handler to save grade/comment and complete game
  const handleEndGame = (grade: number, comment: string) => {
    if (!endGameModal.gameId) return;
    setGames((prev) => prev.map((g) => g.id === endGameModal.gameId ? { ...g, status: "completed", personalRating: `${grade}/10`, comment } : g));
    setTimeout(() => {
      localStorage.setItem("games", JSON.stringify(games.map((g) => g.id === endGameModal.gameId ? { ...g, status: "completed", personalRating: `${grade}/10`, comment } : g)));
    }, 0);
    setEndGameModal({ open: false });
    if (typeof window !== "undefined" && window.confetti) {
      window.confetti({ particleCount: 80, spread: 80 });
    }
  };

  // Handler to open restart modal
  const handleOpenRestartModal = (gameId: string) => {
    setRestartModal({ open: true, gameId });
  };
  // Handler to confirm restart
  const handleRestartGame = () => {
    if (!restartModal.gameId) return;
    setGames((prev) => prev.map((g) => g.id === restartModal.gameId ? { ...g, status: "todo", personalRating: undefined, comment: undefined } : g));
    setTimeout(() => {
      localStorage.setItem("games", JSON.stringify(games.map((g) => g.id === restartModal.gameId ? { ...g, status: "todo", personalRating: undefined, comment: undefined } : g)));
    }, 0);
    setRestartModal({ open: false });
  };

  // Handler to open add game modal
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className={darkMode ? "dark min-h-screen p-4 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden" : "min-h-screen p-4 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden"}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between mb-2">
          <button
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? " Dark" : " Light"}
          </button>
          <label className="px-3 py-1 rounded bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 text-xs font-semibold shadow hover:bg-blue-300 dark:hover:bg-blue-700 transition cursor-pointer">
            Import JSON
            <input
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={async (e) => {
                if (!e.target.files?.[0]) return;
                const file = e.target.files[0];
                const text = await file.text();
                let imported: any[] = [];
                try {
                  imported = JSON.parse(text);
                  if (!Array.isArray(imported)) throw new Error("Invalid format");
                } catch (err) {
                  alert("Invalid JSON file");
                  return;
                }
                // Show loading indicator
                setImporting(true);
                // Fetch covers for each game
                const importedWithCovers = await Promise.all(imported.map(async (g) => {
                  if (!g.coverUrl) {
                    const url = await fetchRawgCover(g.name);
                    return { ...g, coverUrl: url || "/default-cover.png" };
                  }
                  return g;
                }));
                // Merge with existing games (optionally deduplicate by name)
                const merged = [...games, ...importedWithCovers];
                handleImportGames(merged);
                setImporting(false);
                e.target.value = ""; // Reset file input
              }}
            />
          </label>
        </div>
        {importing && (
          <div className="w-full flex justify-center items-center my-4">
            <span className="px-4 py-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-sm animate-pulse">
              Importing games and fetching covers...
            </span>
          </div>
        )}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-2 text-center">Game Backlog</h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-4">Track, filter, and manage your games beautifully</p>
          </div>
          <FilterBar
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={(v) => setStatus(v as import("./types/Game").GameStatus | undefined)}
            category={category}
            setCategory={setCategory}
            consoleFilter={consoleFilter}
            setConsoleFilter={setConsoleFilter}
            categories={categories}
            consoles={consoles}
          />
          <StatusToggle status={status} setStatus={setStatus} />
        </header>
        <main>
          <GameList
            games={filteredGames}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteGame}
            onEditComment={handleEditComment}
            onOpenEndGameModal={handleOpenEndGameModal}
            onOpenRestartModal={handleOpenRestartModal}
          />
          <EndGameModal
            open={endGameModal.open}
            onClose={() => setEndGameModal({ open: false })}
            onSave={handleEndGame}
          />
          <ConfirmModal
            open={restartModal.open}
            title="Restart Game"
            message="Are you sure you want to restart this game? This will clear the grade and comment."
            onCancel={() => setRestartModal({ open: false })}
            onConfirm={handleRestartGame}
          />
        </main>
      </div>
      <GameEditModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onSave={handleAddGame} />
      {/* Floating Add Game Button */}
      <button
        className="fixed bottom-8 right-8 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl transition"
        title="Add game"
        onClick={() => setAddModalOpen(true)}
      >
        +
      </button>
    </div>
  );
}


export default App;
