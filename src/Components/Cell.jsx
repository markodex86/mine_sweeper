import React from "react";

const Cell = ({ col, i, j, onLClick, onRClick, cellBgColor }) => {
  const getValue = (cellData) => {
    const { isMine, isRevealed, neighbors, isFlagged } = cellData;
    if (!isRevealed) return isFlagged ? '🚩' : null;
    if (isMine) return "💣";
    // if (isRevealed) return " ";
    if (neighbors) return neighbors;
  };

  const getColor = (neighbor) => {
    switch (neighbor) {
      case 1:
        return "teal"
      case 2:
        return "#fa6781"
      case 3:
        return "Sienna"
      case 4:
        return "purple"
      case 5:
        return "IndianRed"
      case 6:
        return "blue"
      case 7:
        return "red"
      case 8:
        return "BurlyWood"
      default:
        return ""
    }
  }


  return (
    <div
      onClick={(e) => onLClick(e, i, j)}
      onContextMenu={(e) => onRClick(e, i, j)}
      className={`cell ${col.isRevealed ? 'shown' : 'hidden'} ${cellBgColor}`}
      data-dimension={`${i}-${j}`}
      style={{ color: getColor(col.neighbors)}}
    >
      {getValue(col)}
    </div>
  );
};

export default Cell;
