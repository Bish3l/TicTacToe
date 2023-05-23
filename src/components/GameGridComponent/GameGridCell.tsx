import React, { useContext } from "react";
import { GameState, GameContext } from "../../App";

interface Props {
  id: string;
}

const GameGridCell = (props: Props) => {
  const context = useContext(GameContext)!;

  function handleClick() {
    context.dispatch({ type: "register_turn", payload: props.id });
    context.dispatch({ type: "check_winner", payload: "" });
  }

  function showContent() {
    // Showing content depending if it is occupied by X or O
    if (context.state.O.indexOf(props.id) != -1) {
      return <h1>O</h1>;
    } else if (context.state.X.indexOf(props.id) != -1) {
      return <h1>X</h1>;
    }
    // Return clickable div if cell is not occupied
    else {
      return (
        <div className="game-grid-cell-contents" onClick={handleClick}></div>
      );
    }
  }

  return <div className="game-grid-cell">{showContent()}</div>;
};

export default GameGridCell;
