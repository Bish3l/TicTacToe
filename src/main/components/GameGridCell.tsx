import React from 'react'
import { GameState } from './GameGrid';

interface Props {
  id:string;
  dispatch:Function;
  state:GameState;
}

const GameGridCell = (props:Props) => {
  function handleClick() {
    props.dispatch({type: "register_turn", payload: props.id});
    props.dispatch({type: "check_winner", payload: ""});
  }

  function showContent() {
    // Showing content depending if it is occupied by X or O
    if (props.state.O.indexOf(props.id) != -1) {
      return <h1>O</h1>;
    } else if (props.state.X.indexOf(props.id) != -1) {
      return <h1>X</h1>;
    }
    // Return clickable div if cell is not occupied
    else {
      return (
        <div className="game-grid-cell-contents" onClick={handleClick}></div>
      );
    }
  }

  return (
    <div className="game-grid-cell">
      {showContent()}
    </div>
  );
}

export default GameGridCell;



