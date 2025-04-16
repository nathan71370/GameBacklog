import React from "react";
import { Game } from "../types/Game";
import GameCard from "./GameCard";
import { motion } from "framer-motion";

interface GameListProps {
  games: Game[];
  onStatusChange: (id: string, newStatus: import("../types/Game").GameStatus) => void;
  onDelete: (id: string) => void;
  onEditComment: (id: string, comment: string) => void;
  onEditPersonalRating: (id: string, personalRating: string) => void;
  onOpenEndGameModal: (gameId: string) => void;
  onOpenRestartModal: (gameId: string) => void;
}

const GameList: React.FC<GameListProps> = ({ games, onStatusChange, onDelete, onEditComment, onEditPersonalRating, onOpenEndGameModal, onOpenRestartModal }) => {
  return (
    <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-2">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEditComment={onEditComment}
          onEditPersonalRating={onEditPersonalRating}
          onOpenEndGameModal={onOpenEndGameModal}
          onOpenRestartModal={onOpenRestartModal}
        />
      ))}
    </motion.div>
  );
};

export default GameList;
