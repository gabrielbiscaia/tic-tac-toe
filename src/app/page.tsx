"use client";

import React from "react";
import { getGameStatus } from "@/utils/uiHelpers";
import { useTicTacToe } from "@/hooks/useTicTacToe";
import { GameSquare } from "@/components/GameSquare";
import { WinnerLine } from "@/components/WinnerLine";

const TicTacToe: React.FC = () => {
  const { board, currentPlayer, winner, winnerLine, handleClick, resetGame } =
    useTicTacToe();

  const { text: statusText, color: statusColor } = getGameStatus(
    winner,
    currentPlayer,
  );

  return (
    <div className="text-white flex flex-col items-center justify-center min-h-screen bg-slate-800">
      <h1 className="text-5xl font-bold mb-8">
        <span className="border-b-2 border-purple-500">Tic</span>{" "}
        <span className="border-b-2 border-purple-500">Tac</span>{" "}
        <span className="border-b-2 border-purple-500">Toe</span>
      </h1>
      <div className="grid grid-cols-3 gap-1 mb-4 relative">
        {board.map((value, index) => (
          <GameSquare
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isWinnerSquare={winnerLine?.includes(index) ?? false}
          />
        ))}
        {winnerLine && <WinnerLine winnerLine={winnerLine} winner={winner} />}
      </div>
      <div
        className="w-[300px] h-[60px] flex justify-center items-center text-2xl font-semibold mb-4 p-4 border-4 border-purple-500 border-dotted"
        style={{ borderColor: statusColor }}
      >
        {statusText}
      </div>
      <button
        className="w-[300px] h-[60px] flex justify-center items-center bg-purple-500 hover:bg-purple-600 text-white text-xl font-bold py-4 px-8 rounded"
        onClick={resetGame}
      >
        Reset the game
      </button>
    </div>
  );
};

export default TicTacToe;
