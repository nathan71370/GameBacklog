import React from "react";
import { Game, GameStatus } from "../types/Game";
import { motion } from "framer-motion";

interface GameCardProps {
  game: Game;
  onStatusChange: (id: string, newStatus: GameStatus) => void;
  onDelete: (id: string) => void;
  onEditComment: (id: string, comment: string) => void;
  onOpenEndGameModal: (gameId: string) => void;
  onOpenRestartModal: (gameId: string) => void;
}

const statusColors: Record<Game["status"], string> = {
  "todo": "bg-blue-100 text-blue-700",
  "in-progress": "bg-yellow-100 text-yellow-700",
  "completed": "bg-green-100 text-green-700",
};

function GameCard({ game, onStatusChange, onDelete, onEditComment, onOpenEndGameModal, onOpenRestartModal }: GameCardProps) {
  const [editingComment, setEditingComment] = React.useState(false);
  const [commentInput, setCommentInput] = React.useState(game.comment || '');

  return (
    <motion.div
      className={`relative bg-card-light dark:bg-card-dark rounded-xl shadow-md p-4 flex flex-col items-center min-w-[180px] min-h-[260px] hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      layout
    >
      {/* Delete button top right */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-lg"
        title="Delete game"
        onClick={() => {
          if (window.confirm('Remove this game?')) onDelete(game.id);
        }}
      >
        🗑️
      </button>
      <img
        src={game.coverUrl || "/default-cover.png"}
        alt={game.name}
        className="w-32 h-40 object-cover rounded mb-2 bg-gray-200 dark:bg-gray-800"
        loading="lazy"
      />
      <div className="flex items-center gap-2 mb-1 w-full justify-between">
        <span className="font-bold text-sm line-clamp-1" title={game.name}>{game.name}</span>
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[game.status]}`}>{game.status.replace("-", " ")}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-1 w-full">
        {game.console.map((c) => (
          <span
            key={c}
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 px-2 py-0.5 rounded text-xs font-medium"
          >
            {c}
          </span>
        ))}
      </div>
      {/* Action Buttons Below Console Tags */}
      <div className="flex flex-wrap gap-2 mb-2 w-full justify-center">
        {game.status === "todo" && (
          <button
            className="px-3 py-1 text-xs font-semibold rounded bg-yellow-500 text-white hover:bg-yellow-600 shadow"
            onClick={() => onStatusChange(game.id, "in-progress")}
          >
            Start Game
          </button>
        )}
        {game.status === "in-progress" && (
          <>
            <button
              className="px-3 py-1 text-xs font-semibold rounded bg-gray-400 text-white hover:bg-gray-500 shadow"
              onClick={() => onStatusChange(game.id, "todo")}
            >
              Stop Game
            </button>
            <button
              className="px-3 py-1 text-xs font-semibold rounded bg-green-600 text-white hover:bg-green-700 shadow"
              onClick={() => onOpenEndGameModal(game.id)}
            >
              End Game
            </button>
          </>
        )}
        {game.status === "completed" && (
          <>
            <button
              className="px-3 py-1 text-xs font-semibold rounded bg-yellow-400 text-white hover:bg-yellow-500 shadow"
              onClick={() => onOpenRestartModal(game.id)}
            >
              Restart Game
            </button>
          </>
        )}
      </div>
      {game.personalRating && (
        <div className="text-xs text-purple-600 font-semibold mb-1">{game.personalRating}</div>
      )}
      {game.note && (
        <div className="text-xs text-gray-500 italic line-clamp-2">{game.note}</div>
      )}
      {/* Comment display and edit */}
      {game.comment && !editingComment && (
        <div className="w-full mt-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded p-2 relative">
          <span>{game.comment}</span>
          <button
            className="absolute top-1 right-1 text-xs text-blue-400 hover:text-blue-600"
            onClick={() => setEditingComment(true)}
          >
            ✏️
          </button>
        </div>
      )}
      {editingComment && (
        <div className="w-full mt-2 flex flex-col gap-1">
          <textarea
            className="rounded p-1 text-xs border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100"
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            rows={2}
          />
          <div className="flex gap-2 justify-end">
            <button
              className="text-xs text-gray-400 hover:text-gray-700"
              onClick={() => setEditingComment(false)}
            >
              Cancel
            </button>
            <button
              className="text-xs text-blue-500 hover:text-blue-700"
              onClick={() => {
                onEditComment(game.id, commentInput);
                setEditingComment(false);
              }}
              disabled={commentInput.trim() === (game.comment?.trim() || "")}
            >
              Save
            </button>
          </div>
        </div>
      )}
      {(!game.comment || game.comment.trim() === "") && !editingComment && (
        <button
          className="w-full mt-2 text-xs text-blue-500 hover:underline"
          onClick={() => {
            const newComment = window.prompt('Add a comment:');
            if (newComment) onEditComment(game.id, newComment);
          }}
        >
          + Add comment
        </button>
      )}
    </motion.div>
  );
};

export default GameCard;
