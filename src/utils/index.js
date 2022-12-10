import { useEffect, useState } from "react";
import produce from "immer";

export const generateRandomMines = (
  data = [],
  height = 0,
  width = 0,
  mines = 0
) => {
  let minesPlanted = 0;
  while (minesPlanted < mines) {
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * height);
    if (!data[randomX][randomY].isMine) {
      data[randomX][randomY].isMine = true;
      minesPlanted++;
    }
  }
  return data;
};

export const getNeighbors = (
  i = 0,
  j = 0,
  data = [],
  height = 0,
  width = 0
) => {
  let neighbors = [];
  const surroundings = [
    [-1, -1], // Left top corner
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  surroundings.forEach(([x, y]) => {
    const newX = i + x;
    const newY = j + y;
    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      neighbors.push(data[newX][newY]);
    }
  });
  return neighbors;
};

export const generateNeighbors = (data = [], height = 0, width = 0) => {
  let dataCopy = data;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      let mines = 0;
      const area = getNeighbors(
        data[i][j].x,
        data[i][j].y,
        data,
        height,
        width
      );
      area.map((value) => {
        if (value.isMine) {
          return mines++;
        }
        return 0;
      });
      if (!mines) {
        dataCopy[i][j].isEmpty = true;
      }
      dataCopy[i][j].neighbors = mines;
    }
  }
  return dataCopy;
};

export const initBoard = (setupData) => {
  const { width: w, height: h, mines: m } = setupData;
  let array2D = Array(w)
    .fill()
    .map((_, indexH) =>
      Array(h)
        .fill()
        .map((_, indexW) => ({
          x: indexH,
          y: indexW,
          isMine: false,
          neighbors: 0,
          isEmpty: false,
          isRevealed: false,
          isFlagged: false,
        }))
    );
  let mutatedArrayWithMines = generateRandomMines(array2D, h, w, m);
  let mutatedArrayWithNeighbors = generateNeighbors(
    mutatedArrayWithMines,
    h,
    w
  );
  return mutatedArrayWithNeighbors;
};

export const showEmptyCells = (h, w, x, y, data) => {
  let neighbors = getNeighbors(x, y, data, h, w);
  neighbors.map((cell) => {
    if (!cell.isRevealed && (cell.isEmpty || !cell.isMine) && !cell.isFlagged) {
      Object.assign(data[cell.x][cell.y], { isRevealed: true });
      if (cell.isEmpty) {
        showEmptyCells(h, w, cell.x, cell.y, data);
      }
    }
    return null;
  });
  return data;
};

export const showGrid = (data) => {
  const revealedGrid = produce(data, (draft) =>
    draft.map((row) =>
      row.map((cell) => {
        return { ...cell, isRevealed: true };
      })
    )
  );
  return revealedGrid;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // if we resize the window
    window.addEventListener("resize", handleResize);

    // on initial mount
    handleResize();

    // on dismount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
