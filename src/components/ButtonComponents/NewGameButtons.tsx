import React, {useContext} from 'react'
import './buttons.css';
import '../../App.css';
import { GameContext } from '../../App';

const NewGameButton = () => {
  const context = useContext(GameContext)!;
  function newGame1P() {
    // Start game triggers scaleOut animations, then entry screen hides itself when there will be no objects on it
    context.dispatch({type: "start_game", payload: "1"})
    setTimeout(() => {
      context.dispatch({type: "hide_entry_screen", payload: ""})
    }, 400)
  }
  function newGame2P() {
    context.dispatch({ type: "start_game", payload: "2" });
    setTimeout(() => {
      context.dispatch({ type: "hide_entry_screen", payload: "" });
    }, 400);
  }
  return (
    <div className="entry-screen-buttons">
      <button
        type="button"
        className={
          context.state.isGameStarted
            ? "gameStartBtn scale-out"
            : "gameStartBtn"
        }
        onClick={newGame1P}
      >
        1 player
      </button>
      <button
        type="button"
        className={
          context.state.isGameStarted
            ? "gameStartBtn scale-out"
            : "gameStartBtn"
        }
        onClick={newGame2P}
      >
        2 players
      </button>
    </div>
  );
}

export default NewGameButton;
