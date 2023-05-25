import React, {useContext} from 'react'
import './newgame.css';
import { GameContext } from '../../App';

const NewGameButton = () => {
  const context = useContext(GameContext)!;
  function newGame() {
    context.dispatch({type: "start_game", payload: ""})
  }
  return (
    <button type="button" className="newGameBtn" onClick={newGame}>New Game</button>
  )
}

export default NewGameButton;
