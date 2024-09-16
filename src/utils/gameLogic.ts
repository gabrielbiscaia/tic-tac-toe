import Player from "@/enum/Player";
import winnerLines from "@/constants/winnerLines";

const checkWinner = (
  squares: Player[],
): { winner: Player; line: number[] | null } => {
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: winnerLines[i] };
    }
  }

  return { winner: Player.None, line: null };
};

export const initializeBoard = (): Player[] => Array(9).fill(Player.None);

export const handleMove = (
  board: Player[],
  currentPlayer: Player,
  index: number,
): { newBoard: Player[]; newWinner: Player; winnerLine: number[] | null } => {
  if (board[index] !== Player.None)
    return { newBoard: board, newWinner: Player.None, winnerLine: null };

  const newBoard = [...board];
  newBoard[index] = currentPlayer;
  const { winner, line } = checkWinner(newBoard);

  return { newBoard, newWinner: winner, winnerLine: line };
};

export const getNextPlayer = (currentPlayer: Player): Player =>
  currentPlayer === Player.X ? Player.O : Player.X;
