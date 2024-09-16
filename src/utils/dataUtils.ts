import Player from "@/enum/Player";

export const createInitialState = () => ({
  board: Array(9).fill(Player.None),
  currentPlayer: Player.X,
  winner: Player.None,
  winnerLine: null,
});
