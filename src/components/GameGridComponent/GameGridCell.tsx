import React, { useContext } from "react";
import { GameContext } from "../../App";
import "./grid.css";

interface Props {
  id: string;
}

const GameGridCell = (props: Props) => {
  const context = useContext(GameContext)!;

  function handleClick() {
    // Click is available only if this isn't a bot's turn OR player is playing without a bot
    if (context.state.playingWithBot == false || context.state.currentTurn !== context.state.botPlayingWith) {
      context.dispatch({ type: "register_turn", payload: props.id });
      context.dispatch({ type: "check_round_winner", payload: "" });
    }
  }

  function showContent() {
    // Showing content depending if it is occupied by X or O
    if (context.state.O.indexOf(props.id) !== -1) {
      return <div className="O-cell" />;
    } else if (context.state.X.indexOf(props.id) !== -1) {
      return <div className="X-cell" />;
    }
    // Return clickable div if cell is not occupied
    else {
      return (
        <div className="game-grid-cell-contents" onClick={handleClick}></div>
      );
    }
  }

  // If game ended and a cell is a part of winning combinations, then it'll be flashing for a couple of seconds to indicate win
  function showCell() {
    if (
      context.state.isRoundEnded &&
      context.state.winningCombination?.indexOf(props.id.toString()) !== -1 &&
      context.state.winner !== null
    ) {
      return <div className="game-grid-cell winning-cell">{showContent()}</div>;
    }
    return <div className="game-grid-cell">{showContent()}</div>;
  }

  return showCell();
};

export default GameGridCell;
