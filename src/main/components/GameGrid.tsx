import React, {useReducer} from 'react';
import Cell from './GameGridCell';
import './grid.css';

// Game variables
const winningCombinations = [
    ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]
]

const initialState: GameState = {
  currentTurn: "X",
  O: [],
  X: [],
  isGameEnded: false,
};

// Helper Functions
// This function checks if haystack array contains all elements from needle array
function containsAll(needle:string[], haystack:string[]):boolean {
    for (let i = 0; i < needle.length; i++) {
        if (haystack.indexOf(needle[i]) === -1) {
            return false;
        }
    }
    return true;
}

// Interfaces & Types
export interface GameState {
    currentTurn:"O"|"X";
    // These two arrays will store the information about the squares each player hold
    O:string[];
    X:string[];
    isGameEnded:boolean;
}

type Action = {
    type:string,
    payload:string
}

// Reducer
const reducer = (state:GameState, action:Action):GameState => {
    switch (action.type) {
        case "register_turn":
            // Checking who made the turn
            if (state.currentTurn === "X") {
                // Action payload will have a cell, which is added to a list of player's occupied cells.
                let newX = [...state.X, action.payload];
                return {
                    ...state,
                    X: newX,
                    // Passing the turn to the second player
                    currentTurn: "O",
                }
            }
            else if (state.currentTurn === "O"){
                let newO = [...state.O, action.payload]
                return {
                    ...state,
                    O: newO,
                    currentTurn: "X",
                }
            }
            throw new Error("No matching state.CurrentTurn in reducer")
        case "check_winner":
            // Check winner will be called after the turn is passed to second player, but we are checking the player who just made the turn
            let player:"O"|"X";
            if (state.currentTurn === "X") {
                player = "O";
            }
            else {
                player = "X";
            }
            const occupiedCells = state[player];

            // Check if player's occupied cells contain winning combination cells; if so - we have a winner!
            for (let i = 0; i < winningCombinations.length; i++) {
                if (containsAll(winningCombinations[i], occupiedCells)) {
                    return {
                        ...state,
                        isGameEnded: true
                    };
                }
            }
            // If all squares are filled, but we have no winner - it is a draw
            if (state.X.length + state.O.length === 9) {
                return {
                    ...state,
                    isGameEnded: true
                }
            }
            return state;
        case "new_game":
            return initialState;
        default:
            throw new Error("Didn't find matching action type");
    }
};

// Component
const GameGrid = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    let cells = [];
    for (let i = 1; i < 10; i++) {
      cells.push(
        <Cell
          key={i.toString()}
          id={i.toString()}
          dispatch={dispatch}
          state={state}
        />
      );
    }

    function restartGame() {
        if (state.isGameEnded == true) {
            dispatch({type: "new_game", payload: ""});
        }
    }

    return (
      <div className="game-grid" onClick={restartGame}>
        {cells}
      </div>
    );
}

export default GameGrid;