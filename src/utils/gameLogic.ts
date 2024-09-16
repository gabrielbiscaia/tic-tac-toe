import Player from "@/enum/Player";
import winnerLines from "@/constants/winnerLines";

const checkWinner = (squares: Player[]): Player => {
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return Player.None;
};

export const initializeBoard = (): Player[] => Array(9).fill(Player.None);

export const handleMove = (
  board: Player[],
  currentPlayer: Player,
  index: number,
): { newBoard: Player[]; newWinner: Player | null } => {
  if (board[index] !== Player.None) return { newBoard: board, newWinner: null };

  const newBoard = [...board];
  newBoard[index] = currentPlayer;
  const newWinner = checkWinner(newBoard);

  return { newBoard, newWinner };
};

export const getNextPlayer = (currentPlayer: Player): Player =>
  currentPlayer === Player.X ? Player.O : Player.X;
