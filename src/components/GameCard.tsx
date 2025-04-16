import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Game } from "../types/Game";

interface GameCardProps {
  game: Game;
  onStatusChange: (id: string, status: Game["status"]) => void;
  onDelete: (id: string) => void;
  onEditComment: (id: string, comment: string) => void;
  onOpenEndGameModal: (id: string) => void;
  onOpenRestartModal: (id: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  onStatusChange,
  onDelete,
  onEditComment,
  onOpenEndGameModal,
  onOpenRestartModal,
}) => {
  const [editingComment, setEditingComment] = useState(false);
  const [commentInput, setCommentInput] = useState(game.comment || "");

  return (
    <motion.div
      className={
        "relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-4 border-gray-300 dark:border-gray-700 flex flex-col items-stretch overflow-hidden transition-transform hover:scale-105 w-[200px] max-w-[220px] min-w-[180px] h-[240px]"
      }
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      layout
    >
      {/* Faux spine label */}
      <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-b from-blue-600 to-blue-400 flex flex-col justify-center items-center rounded-l-xl shadow-inner z-10">
        {game.console && game.console.length > 0 && (
          <span className="transform -rotate-90 text-white text-[10px] font-bold tracking-wider whitespace-nowrap">
            {game.console.join(", ")}
          </span>
        )}
      </div>
      {/* Trashcan button absolutely at card top right, shifted right for spine */}
      <button
        className="absolute top-2 right-2 text-gray-400 bg-white/90 rounded-full p-0.5 z-40 transition-colors text-[14px] hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white border border-gray-200"
        title="Delete game"
        style={{ lineHeight: 1 }}
        onClick={() => {
          if (window.confirm('Remove this game?')) onDelete(game.id);
        }}
      >
        🗑️
      </button>
      {/* Grade badge at top left, shifted right for spine */}
      {game.personalRating && (
        <div className="absolute top-2 left-8 z-40">
          <span className="inline-block px-2 py-0.5 rounded bg-purple-600 text-white text-xs font-bold shadow-md">
            ⭐ {game.personalRating}
          </span>
        </div>
      )}
      {/* All main content shifted right for faux spine */}
      <div className="ml-6 flex flex-col flex-1 h-full">
        {/* Game cover art - shrinks when editing/adding comment */}
        <div className={`w-full relative transition-all duration-300 ${editingComment ? 'h-[70px]' : 'h-[120px]'}`}>
          <img
            src={game.coverUrl || "/default-cover.png"}
            alt={game.name}
            className="w-full h-full object-cover rounded-t-xl border-b-2 border-gray-300 dark:border-gray-700"
            loading="lazy"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-2 py-2 text-center">
            <span className="text-white text-base font-bold drop-shadow-md line-clamp-2" title={game.name}>{game.name}</span>
          </div>
        </div>
        {/* Action & status area (bottom of box) */}
        <div className="flex flex-col flex-1 justify-end p-2 bg-gradient-to-t from-gray-100/90 dark:from-gray-800/90 to-transparent relative overflow-y-auto min-h-0">

        {/* Status/Action stickers */}
        <div className="flex flex-row gap-x-1 gap-y-1 mb-2 w-full justify-center items-center flex-nowrap">
          {game.status === "todo" && (
            <button
              className="px-2 py-0.5 text-[11px] font-semibold rounded bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm min-w-[70px]"
              onClick={() => onStatusChange(game.id, "in-progress")}
            >
              Start
            </button>
          )}
          {game.status === "in-progress" && (
            <>
              <button
                className="px-2 py-0.5 text-[11px] font-semibold rounded bg-gray-400 text-white hover:bg-gray-500 shadow-sm min-w-[70px]"
                onClick={() => onStatusChange(game.id, "todo")}
              >
                Stop
              </button>
              <button
                className="px-2 py-0.5 text-[11px] font-semibold rounded bg-green-600 text-white hover:bg-green-700 shadow-sm min-w-[70px]"
                onClick={() => onOpenEndGameModal(game.id)}
              >
                End
              </button>
            </>
          )}
          {game.status === "completed" && (
            <button
              className="px-2 py-0.5 text-[11px] font-semibold rounded bg-yellow-400 text-white hover:bg-yellow-500 shadow-sm min-w-[70px]"
              onClick={() => onOpenRestartModal(game.id)}
            >
              Restart
            </button>
          )}
        </div>

        {/* Comment as back blurb */}
        {editingComment ? (
          <div className="w-full mb-1 flex flex-col min-h-[90px] justify-between">
            <textarea
              className="w-full text-xs p-1 rounded border border-gray-300 dark:border-gray-700 resize-none bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={2}
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              maxLength={140}
              autoFocus
            />
            <div className="flex gap-2 mt-1 justify-end">
              <button
                className="px-2 py-0.5 text-[11px] rounded bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => {
                  onEditComment(game.id, commentInput);
                  setEditingComment(false);
                }}
              >
                Save
              </button>
              <button
                className="px-2 py-0.5 text-[11px] rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
                onClick={() => setEditingComment(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {game.comment && (
              <div className="w-full text-xs italic text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/60 rounded p-1 mt-1 line-clamp-3" title={game.comment}>
                {game.comment}
              </div>
            )}
            {(!game.comment || game.comment.trim() === "") && (
              <button
                className="w-full mt-1 text-[11px] text-blue-600 hover:underline"
                onClick={() => setEditingComment(true)}
              >
                + Add comment
              </button>
            )}
            {game.comment && (
              <button
                className="w-full px-2 py-0.5 text-[11px] bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 mt-1"
                onClick={() => setEditingComment(true)}
              >
                Edit comment
              </button>
            )}
          </>
        )}
      </div>
    </div>
    </motion.div>
  );
};

export default GameCard;
