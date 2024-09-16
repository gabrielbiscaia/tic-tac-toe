import React from "react";
import Player from "@/enum/Player";
import { getSquareColor } from "@/utils/uiHelpers";

interface WinnerLineProps {
  winnerLine: number[];
  winner: Player;
}

export const WinnerLine: React.FC<WinnerLineProps> = ({
  winnerLine,
  winner,
}) => {
  const [start, end] = [winnerLine[0], winnerLine[2]];
  const isHorizontal = Math.abs(start - end) === 2;
  const isVertical = Math.abs(start - end) === 6;
  const isDiagonal = Math.abs(start - end) === 8 || (start === 2 && end === 6);

  let lineStyle: React.CSSProperties = {
    position: "absolute",
    backgroundColor: getSquareColor(winner),
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
