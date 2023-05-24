import React, { ReactNode, useContext } from "react";
import { GameContext } from "../../App";
import Cell from "./GameGridCell";
import "./grid.css";

// Component
const GameGrid = () => {
  const props = useContext(GameContext)!;
  
  // Creating 9 cells to fill up the grid
  let cells:ReactNode[] = [];
  for (let i = 1; i < 10; i++) {
    cells.push(<Cell key={i.toString()} id={i.toString()} />);
  }

  function restartGame() {
    if (props.state.isGameEnded === true) {
      props.dispatch({ type: "new_game", payload: "" });
    }
  }
  function showGrid() {
    if (props.state.isGameEnded === true) {
      return (
        <div className="game-grid clickable" onClick={restartGame}>
          {cells}
        </div>
      )
    }
    else {
      return (
        <div className="game-grid">
          {cells}
        </div>
      )
    }
  }

  return (
    <>
      {showGrid()}
    </>
  );
};

export default GameGrid;
