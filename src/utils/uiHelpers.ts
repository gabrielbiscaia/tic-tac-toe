import Player from "@/enum/Player";

export const getSquareColor = (value: Player): string => {
  switch (value) {
    case Player.X:
      return "#F67200";
    case Player.O:
      return "#0066CC";
    default:
      return "inherit";
  }
};

export const getGameStatus = (
  winner: Player,
  currentPlayer: Player,
): { text: string; color: string } => {
  if (winner !== Player.None) {
    return { text: `Winner: ${winner}`, color: getSquareColor(winner) };
  } else {
    return {
      text: `Current player: ${currentPlayer}`,
      color: getSquareColor(currentPlayer),
    };
  }
};
