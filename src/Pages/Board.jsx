import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Stack from "@mui/material/Stack";
import { initBoard, showEmptyCells, showGrid, useWindowSize } from "../utils";
import Cell from "../Components/Cell";
import produce from "immer";
import Confetti from "react-confetti";

const Board = ({ setupData, setGameStarted }) => {
  const [gameState, setGameState] = useState("😁");
  const [mineCount, setMineCount] = useState(setupData.mines);
  const [grid, setGrid] = useState(() => initBoard(setupData));
  const [confetti, setConfetti] = useState(false);
  const windowSize = useWindowSize();

  const onLeftClick = (event, x, y) => {
    event.preventDefault();
    if (grid[x][y].isRevealed || grid[x][y].isFlagged) return;
    const updatedGrid = produce(grid, (draft) => {
      Object.assign(draft[x][y], { isRevealed: true });
      if (draft[x][y].isEmpty) {
        showEmptyCells(setupData.height, setupData.width, x, y, draft);
      }
    });
    if (updatedGrid[x][y].isMine) {
      const revealedGrid = showGrid(updatedGrid);
      setGrid(revealedGrid);
      return setGameState("😤");
    }
    // winning strategy
    const hiddenGrid = updatedGrid.flat().filter((cell) => !cell.isRevealed);
    if (hiddenGrid.length === setupData.mines) {
      setGameState("😎");
      setConfetti(true);
      showGrid(updatedGrid);
    }
    setGrid(updatedGrid);
  };

  const onRightClick = (event, x, y) => {
    event.preventDefault();
    let mineCountPlaceholder = mineCount;
    if (grid[x][y].isRevealed) return;
    const updatedGrid = produce(grid, (draft) => {
      draft[x][y].isFlagged
        ? (mineCountPlaceholder += 1)
        : (mineCountPlaceholder -= 1);
      if (mineCountPlaceholder >= 0 && mineCountPlaceholder <= mineCount + 1) {
        draft[x][y].isFlagged = !draft[x][y].isFlagged;
        setMineCount(mineCountPlaceholder);
      }
    });
    setGrid(updatedGrid);
  };

  const resetGame = (e, setupData) => {
    e.preventDefault();
    setGameState("😁");
    setConfetti(false);
    setMineCount(setupData.mines);
    setGrid(initBoard(setupData));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="center">
        <Paper elevation={3} sx={{ padding: "1rem" }}>
          <Card
            variant="outlined"
            sx={{
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: (theme) => theme.palette.grey[200],
              textAlign: "center",
            }}
          >
            <h1>{gameState}</h1>
            <h3>Mines Remaining: {mineCount}</h3>
            <Stack
              spacing={2}
              justifyContent="center"
              direction={setupData.height === 10 ? "column" : "row"}
            >
              <Button
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => setGameStarted(false)}
                variant="contained"
                color="success"
              >
                Back to start page
              </Button>
              <Button
                onClick={(e) => resetGame(e, setupData)}
                variant="contained"
              >
                Reset the Game
              </Button>
            </Stack>
          </Card>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${setupData.width}, 30px)`,
              gridTemplateRows: `repeat(${setupData.height}, 30px)`,
            }}
          >
            {grid.map((row, i) =>
              row.map((col, j) => (
                <Cell
                  onLClick={(e, i, j) => onLeftClick(e, i, j)}
                  onRClick={(e, i, j) => onRightClick(e, i, j)}
                  key={`${i}-${j}`}
                  col={col}
                  i={i}
                  j={j}
                  cellBgColor={(i + j) % 2 === 0 ? "dark" : "light"}
                />
              ))
            )}
          </div>
        </Paper>
      </div>
      <Confetti
        width={confetti ? windowSize.width : 0}
        height={confetti ? windowSize.height : 0}
        recycle={true}
      ></Confetti>
    </Container>
  );
};

export default Board;
