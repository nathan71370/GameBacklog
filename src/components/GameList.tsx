import React from "react";
import { Game } from "../types/Game";
import GameCard from "./GameCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
// Optionally import Swiper modules for navigation/pagination
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

interface GameListProps {
  games: Game[];
  onStatusChange: (id: string, newStatus: import("../types/Game").GameStatus) => void;
  onDelete: (id: string) => void;
  onEditComment: (id: string, comment: string) => void;
  onOpenEndGameModal: (gameId: string) => void;
  onOpenRestartModal: (gameId: string) => void;
}

const GameList: React.FC<GameListProps> = ({ games, onStatusChange, onDelete, onEditComment, onOpenEndGameModal, onOpenRestartModal }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Mousewheel, FreeMode]}
        mousewheel={{ forceToAxis: true }}
        freeMode={true}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 }
        }}
        // If you want navigation/pagination:
        // modules={[Navigation, Pagination]}
        // navigation
        // pagination={{ clickable: true }}
        style={{ paddingBottom: '2rem' }}
      >
        {games.map((game) => (
          <SwiperSlide key={game.id} style={{ display: 'flex', justifyContent: 'center' }}>
            <GameCard
              game={game}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onEditComment={onEditComment}
              onOpenEndGameModal={onOpenEndGameModal}
              onOpenRestartModal={onOpenRestartModal}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GameList;
