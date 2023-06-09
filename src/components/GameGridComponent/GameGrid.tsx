import React, { useContext } from "react";
import { GameContext } from "../../App";
import Cell from "./GameGridCell";
import "./grid.css";

// Component
const GameGrid = () => {
  const context = useContext(GameContext)!;

  // Creating 9 cells to fill up the grid
  let cells: any = [];
  for (let i = 1; i < 10; i++) {
    cells.push(<Cell key={i.toString()} id={i.toString()} />);
  }

  function newRound() {
    if (context.state.isRoundEnded === true) {
      context.dispatch({ type: "new_round", payload: "" });
    }
  }
  function showGrid() {
    if (context.state.isRoundEnded === true) {
      return (
        <div className="game-grid clickable" onClick={newRound}>
          {cells}
        </div>
      );
    } else {
      return <div className="game-grid">{cells}</div>;
    }
  }

  return <>{showGrid()}</>;
};

export default GameGrid;
