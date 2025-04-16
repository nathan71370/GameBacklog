import React from "react";

interface GameEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (game: { name: string; console: string[]; status: string; personalRating?: string; comment?: string }) => void;
}

const statusOptions = ["todo", "in-progress", "completed"];

const GameEditModal: React.FC<GameEditModalProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = React.useState("");
  // Use multi-select for consoles
  const [selectedConsoles, setSelectedConsoles] = React.useState<string[]>([]);
  const [consoleOptions, setConsoleOptions] = React.useState<string[]>([]);
  const [consoleInput, setConsoleInput] = React.useState<string>("");

  React.useEffect(() => {
    const stored = localStorage.getItem("consoles");
    if (stored) {
      setConsoleOptions(JSON.parse(stored));
    }
  }, [open]);

  const handleAddConsole = () => {
    const val = consoleInput.trim();
    if (!val || consoleOptions.includes(val)) return;
    const updated = [...consoleOptions, val];
    setConsoleOptions(updated);
    setConsoleInput("");
    localStorage.setItem("consoles", JSON.stringify(updated));
  };

  const handleRemoveConsole = (val: string) => {
    const updated = consoleOptions.filter(c => c !== val);
    setConsoleOptions(updated);
    // Also remove from selectedConsoles if present
    setSelectedConsoles(selectedConsoles.filter(c => c !== val));
    localStorage.setItem("consoles", JSON.stringify(updated));
  };

  const [status, setStatus] = React.useState("todo");
  const [personalRating, setPersonalRating] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!open) {
      setName("");
      setSelectedConsoles([]);
      setStatus("todo");
      setPersonalRating("");
      setComment("");
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const handleSave = () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!selectedConsoles.length) {
      setError("At least one console is required");
      return;
    }
    setError("");
    onSave({
      name: name.trim(),
      console: selectedConsoles,
      status,
      personalRating: personalRating.trim() || undefined,
      comment: comment.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 min-w-[320px] shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Add Game</h2>
        <div className="flex flex-col gap-3">
          {/* Console management UI */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Manage Consoles</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 flex-1"
                placeholder="Add new console"
                value={consoleInput || ""}
                onChange={e => setConsoleInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && consoleInput.trim()) {
                    handleAddConsole();
                  }
                }}
              />
              <button
                type="button"
                className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                onClick={handleAddConsole}
                disabled={!consoleInput || consoleOptions.includes(consoleInput.trim())}
              >Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {consoleOptions.map(opt => (
                <span key={opt} className="inline-flex items-center bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 text-xs text-gray-800 dark:text-gray-100">
                  {opt}
                  <button
                    type="button"
                    className="ml-1 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveConsole(opt)}
                    title="Remove console"
                  >×</button>
                </span>
              ))}
            </div>
          </div>
          <input
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Game name*"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />
          <select
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            multiple
            value={selectedConsoles}
            onChange={e => {
              const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
              setSelectedConsoles(selected);
            }}
          >
            {consoleOptions.length === 0 && (
              <option value="" disabled>No consoles found</option>
            )}
            {consoleOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="text-xs text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple consoles.</div>
          <select
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
            ))}
          </select>
          <input
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Personal rating (optional)"
            value={personalRating}
            onChange={e => setPersonalRating(e.target.value)}
          />
          <textarea
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Comment (optional)"
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={2}
          />
          {error && <div className="text-red-500 text-xs">{error}</div>}
        </div>
        <div className="flex gap-2 mt-6 justify-end">
          <button
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            onClick={handleSave}
            disabled={!name.trim() || !consoleInput.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameEditModal;
