import { useState } from "react";
import Player from "@/enum/Player";
import { handleMove, getNextPlayer } from "@/utils/gameLogic";
import { createInitialState } from "@/utils/dataUtils";

interface GameState {
  board: Player[];
  currentPlayer: Player;
  winner: Player;
  winnerLine: number[] | null;
}

export const useTicTacToe = () => {
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

  return { board, currentPlayer, winner, winnerLine, handleClick, resetGame };
};
