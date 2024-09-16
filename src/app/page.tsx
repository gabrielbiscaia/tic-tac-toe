"use client";

import React, { useState } from "react";
import Player from "@/enum/Player";
import { handleMove, getNextPlayer } from "@/utils/gameLogic";
import { getSquareColor, getGameStatus } from "@/utils/uiHelpers";
import { createInitialState } from "@/utils/dataUtils";

const TicTacToe: React.FC = () => {
  const [{ board, currentPlayer, winner }, setGameState] =
    useState(createInitialState());

  const handleClick = (index: number) => {
    if (winner !== Player.None || board[index] !== Player.None) return;

    const { newBoard, newWinner } = handleMove(board, currentPlayer, index);
    setGameState((prevState) => ({
      ...prevState,
      board: newBoard,
      winner: newWinner || Player.None,
      currentPlayer: getNextPlayer(prevState.currentPlayer),
    }));
  };

  const resetGame = () => setGameState(createInitialState());

  const renderSquare = (index: number) => (
    <button
      className="w-24 h-24 border border-gray-400 text-5xl font-bold flex items-center justify-center"
      onClick={() => handleClick(index)}
      style={{ color: getSquareColor(board[index]) }}
    >
      {board[index]}
    </button>
  );

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
      <div className="grid grid-cols-3 gap-1 mb-4">
        {board.map((_, index) => (
          <React.Fragment key={index}>{renderSquare(index)}</React.Fragment>
        ))}
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
