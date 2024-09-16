"use client";

import React, { useState } from "react";
import Player from "@/enum/Player";
import { handleMove, getNextPlayer } from "@/utils/gameLogic";
import { getSquareColor, getGameStatus } from "@/utils/uiHelpers";
import { createInitialState } from "@/utils/dataUtils";

interface GameState {
  board: Player[];
  currentPlayer: Player;
  winner: Player;
  winnerLine: number[] | null;
}

const TicTacToe: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    ...createInitialState(),
    winnerLine: null,
  }));

  const { board, currentPlayer, winner, winnerLine } = gameState;

  const handleClick = (index: number) => {
    if (winner !== Player.None || board[index] !== Player.None) return;

    const { newBoard, newWinner, winnerLine } = handleMove(
      board,
      currentPlayer,
      index,
    );
    setGameState((prevState) => ({
      ...prevState,
      board: newBoard,
      winner: newWinner,
      winnerLine: winnerLine,
      currentPlayer: getNextPlayer(prevState.currentPlayer),
    }));
  };

  const resetGame = () =>
    setGameState({ ...createInitialState(), winnerLine: null });

  const renderSquare = (index: number) => {
    const isWinnerSquare = winnerLine?.includes(index) ?? false;
    return (
      <button
        className={`w-24 h-24 border border-gray-400 text-5xl font-bold flex items-center justify-center relative ${
          isWinnerSquare ? "z-10" : ""
        }`}
        onClick={() => handleClick(index)}
        style={{ color: getSquareColor(board[index]) }}
      >
        {board[index]}
      </button>
    );
  };

  const { text: statusText, color: statusColor } = getGameStatus(
    winner,
    currentPlayer,
  );

  const renderWinnerLine = () => {
    if (!winnerLine) return null;

    const [start, end] = [winnerLine[0], winnerLine[2]];
    const isHorizontal = Math.abs(start - end) === 2;
    const isVertical = Math.abs(start - end) === 6;
    const isDiagonal =
      Math.abs(start - end) === 8 || (start === 2 && end === 6);

    let lineStyle: React.CSSProperties = {
      position: "absolute",
      backgroundColor: statusColor,
      zIndex: 1,
    };

    if (isHorizontal) {
      lineStyle = {
        ...lineStyle,
        width: "100%",
        height: "4px",
        top: `calc(${Math.floor(start / 3) * 33.33}% + 16.665%)`,
      };
    } else if (isVertical) {
      lineStyle = {
        ...lineStyle,
        width: "4px",
        height: "100%",
        left: `calc(${(start % 3) * 33.33}% + 16.665%)`,
      };
    } else if (isDiagonal) {
      lineStyle = {
        ...lineStyle,
        width: "141.4%",
        height: "4px",
        top: "50%",
        left: "-20.7%",
        transformOrigin: "center",
        transform: start === 0 ? "rotate(45deg)" : "rotate(-45deg)",
      };
    }

    return <div style={lineStyle} />;
  };

  return (
    <div className="text-white flex flex-col items-center justify-center min-h-screen bg-slate-800">
      <h1 className="text-5xl font-bold mb-8">
        <span className="border-b-2 border-purple-500">Tic</span>{" "}
        <span className="border-b-2 border-purple-500">Tac</span>{" "}
        <span className="border-b-2 border-purple-500">Toe</span>
      </h1>
      <div className="grid grid-cols-3 gap-1 mb-4 relative">
        {board.map((_, index) => (
          <React.Fragment key={index}>{renderSquare(index)}</React.Fragment>
        ))}
        {renderWinnerLine()}
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
