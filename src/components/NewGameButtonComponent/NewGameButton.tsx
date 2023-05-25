import React, {useContext} from 'react'
import './newgame.css';
import { GameContext } from '../../App';

const NewGameButton = () => {
  const context = useContext(GameContext)!;
  function newGame() {
    // Start game triggers scaleOut animations, then entry screen hides itself when there will be no objects on it
    context.dispatch({type: "start_game", payload: ""})
    setTimeout(() => {
      context.dispatch({type: "hide_entry_screen", payload: ""})
    }, 400)
  }
  return (
    <button type="button" className={context.state.isGameStarted ? "newGameBtn scale-out" : "newGameBtn"} onClick={newGame}>New Game</button>
  )
}

export default NewGameButton;
