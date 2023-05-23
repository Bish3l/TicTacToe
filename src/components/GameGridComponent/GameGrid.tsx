import React, { useContext } from "react";
import { GameContext } from "../../App";
import Cell from "./GameGridCell";
import "./grid.css";

// Component
const GameGrid = () => {
  const props = useContext(GameContext)!;
  
  // Creating 9 cells to fill up the grid
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(<Cell key={i.toString()} id={i.toString()} />);
  }

  function restartGame() {
    if (props.state.isGameEnded == true) {
      props.dispatch({ type: "new_game", payload: "" });
    }
  }

  return (
    <div className="game-grid" onClick={restartGame}>
      {cells}
    </div>
  );
};

export default GameGrid;
