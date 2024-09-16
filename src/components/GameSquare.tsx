import React from "react";
import Player from "@/enum/Player";
import { getSquareColor } from "@/utils/uiHelpers";

interface GameSquareProps {
  value: Player;
  onClick: () => void;
  isWinnerSquare: boolean;
}

export const GameSquare: React.FC<GameSquareProps> = ({
  value,
  onClick,
  isWinnerSquare,
}) => (
  <button
    className={`w-24 h-24 border border-gray-400 text-5xl font-bold flex items-center justify-center relative ${
      isWinnerSquare ? "z-10" : ""
    }`}
    onClick={onClick}
    style={{ color: getSquareColor(value) }}
  >
    {value}
  </button>
);
