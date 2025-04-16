import React from "react";

import { GameStatus } from "../types/Game";

interface StatusToggleProps {
  status: GameStatus | undefined;
  setStatus: (s: GameStatus | undefined) => void;
}

const statusOptions: { label: string; value: GameStatus }[] = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

const StatusToggle: React.FC<StatusToggleProps> = ({ status, setStatus }) => {
  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1 rounded ${!status ? "bg-gray-200 text-gray-600" : "bg-gray-100 text-gray-500"}`}
        onClick={() => setStatus(undefined)}
      >
        All
      </button>
      {statusOptions.map(opt => (
        <button
          key={opt.value}
          className={`px-3 py-1 rounded focus:outline-none transition-colors ${
            status === opt.value
              ? opt.value === "todo"
                ? "bg-blue-500 text-white" :
                opt.value === "in-progress"
                ? "bg-yellow-500 text-white" :
                "bg-green-500 text-white"
              : opt.value === "todo"
                ? "bg-blue-100 text-blue-700" :
                opt.value === "in-progress"
                ? "bg-yellow-100 text-yellow-700" :
                "bg-green-100 text-green-700"
          }`}
          onClick={() => setStatus(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default StatusToggle;
