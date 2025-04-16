import React from "react";

interface GameEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (game: { name: string; console: string[]; status: string; personalRating?: string; comment?: string }) => void;
}

const statusOptions = ["todo", "in-progress", "completed"];

const GameEditModal: React.FC<GameEditModalProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = React.useState("");
  const [consoleInput, setConsoleInput] = React.useState("");
  const [status, setStatus] = React.useState("todo");
  const [personalRating, setPersonalRating] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!open) {
      setName("");
      setConsoleInput("");
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
    if (!consoleInput.trim()) {
      setError("Console is required");
      return;
    }
    setError("");
    onSave({
      name: name.trim(),
      console: consoleInput.split(",").map((c) => c.trim()).filter(Boolean),
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
          <input
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Game name*"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />
          <input
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Console(s), comma-separated*"
            value={consoleInput}
            onChange={e => setConsoleInput(e.target.value)}
          />
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
