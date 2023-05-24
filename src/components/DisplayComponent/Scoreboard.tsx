import React, {useContext} from 'react'
import { GameContext } from "../../App";
import './display.css';

const Scoreboard = () => {
  const context = useContext(GameContext)!;
  return (
    <div className="scoreboard">
      <div>Score</div>
      <div className="score">{context.state.O_score} : {context.state.X_score}</div>
    </div>
  );
}

export default Scoreboard;