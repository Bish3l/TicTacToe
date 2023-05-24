import React, {useContext} from 'react'
import { GameContext } from "../../App";
import './display.css';

interface Props {
    type:"O"|"X";
}

const TurnDisplay = (props:Props) => {
  const context = useContext(GameContext)!;

  function showContent() {
    // Check which player to show on this turnDisplay
    if (props.type === "O") {
        // If it's not the player's turn (or game is ended), his mark will be gray
        if (context.state.currentTurn === "O" && context.state.isGameEnded === false) {
          return (
            <>
              <div className="O"></div>
              <div className="turn-left">TURN</div>
            </>
          );
        }
        else {
          return (
            <>
              <div className="O off"></div>
              <div className="turn-left off">TURN</div>
            </>
          );
        }
    }
    else if (props.type === "X") {
        if (context.state.currentTurn === "X" && context.state.isGameEnded === false) {
          return (
            <>
              <div className="X"></div>
              <div className="turn-right">TURN</div>
            </>
          );
        }
        else {
          return (
            <>
              <div className="X off"></div>
              <div className="turn-right off">TURN</div>
            </>
          );
        }
    }
  }  

  return (
    <>
      {showContent()}
    </>
  );
}

export default TurnDisplay;
