import React, { useReducer, useEffect } from "react";
import GameGrid from "./components/GameGridComponent/GameGrid";
import Display from "./components/DisplayComponent/Display";
import "./App.css";
import NewGameButtons from "./components/ButtonComponents/NewGameButtons";

// Interfaces & Types
export interface GameState {
  currentTurn: "O" | "X";
  O: string[];
  O_score: number;
  X: string[];
  X_score: number;
  hideEntryScreen:boolean;
  isGameStarted: boolean;
  isRoundEnded: boolean;
  playingWithBot: boolean;
  botPlayingWith: "O"|"X";
  winner: "O" | "X" | null;
  winningCombination: string[] | null;
}

type Action = {
  type: string;
  payload: string;
};

type Context = {
  state: GameState;
  dispatch: Function;
};

// Game variables
const winningCombinations = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

var initialState: GameState = {
  currentTurn: "X",
  // O and X arrays will store information about cells every player holds
  O: [],
  O_score: 0,
  X: [],
  X_score: 0,
  isGameStarted: false,
  isRoundEnded: false,
  hideEntryScreen: false,
  playingWithBot: false,
  botPlayingWith: "X",
  winner: null,
  winningCombination: null,
};

// Helper Functions

// This function checks if haystack array contains all elements from needle array
function containsAll(needle: string[], haystack: string[]): boolean {
  for (let i = 0; i < needle.length; i++) {
    if (haystack.indexOf(needle[i]) === -1) {
      return false;
    }
  }
  return true;
}

function randomElementFromArray<T>(arr: T[]):T {
  let randNum = Math.floor(Math.random() * arr.length);
  return arr[randNum];
}

// Reducer
const reducer = (state: GameState, action: Action): GameState => {
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
        };
      } else if (state.currentTurn === "O") {
        let newO = [...state.O, action.payload];
        return {
          ...state,
          O: newO,
          currentTurn: "X",
        };
      }
      throw new Error("No matching state.CurrentTurn in reducer");
    case "check_round_winner":
      if (state.isRoundEnded === false) {
        // Check winner will be called after the turn is passed to second player, but we are checking the player who just made the turn
        let player: "O" | "X";
        if (state.currentTurn === "X") {
          player = "O";
        } else {
          player = "X";
        }
        const occupiedCells = state[player];

        // Check if player's occupied cells contain winning combination cells; if so - we have a winner!
        for (let i = 0; i < winningCombinations.length; i++) {
          if (containsAll(winningCombinations[i], occupiedCells)) {
            if (player === "O") {
              return {
                ...state,
                O_score: state.O_score + 1,
                isRoundEnded: true,
                winner: "O",
                winningCombination: winningCombinations[i],
              };
            } else {
              return {
                ...state,
                X_score: state.X_score + 1,
                isRoundEnded: true,
                winner: "X",
                winningCombination: winningCombinations[i],
              };
            }
          }
        }
        // If all cells are filled, but we have no winner - it is a draw
        if (state.X.length + state.O.length === 9) {
          return {
            ...state,
            isRoundEnded: true,
            O_score: state.O_score + 0.5,
            X_score: state.X_score + 0.5,
            winner: null,
          };
        }
      }
      return state;
    case "new_round":
      return {
        ...initialState,
        O_score: state.O_score,
        X_score: state.X_score,
        // This line swaps turns between 2 players
        currentTurn: state.currentTurn,
      };
    case "start_game":
      if (action.payload === "1") {
        let gameFirstTurn: "O" | "X";
        if (state.botPlayingWith === "O") {
          gameFirstTurn = "X";
        } else {
          gameFirstTurn = "O";
        }
        initialState = {
          ...initialState,
          isGameStarted: true,
          playingWithBot: true,
          currentTurn: gameFirstTurn,
        };
        return {
          ...initialState,
        };
      }
      else if (action.payload === "2") {
        return {
          ...initialState,
          isGameStarted: true,
          playingWithBot: true,
          currentTurn: "X",
        };
      }
      throw new Error ("Invalid action payload in start_game action");
    case "hide_entry_screen":
      // Player will always make first turn of the entire game
      initialState = {
        ...initialState,
        hideEntryScreen: true,
      };
      return initialState;
    default:
      throw new Error("Didn't find matching action type");
  }
};

export const GameContext = React.createContext<Context | null>(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Computer moves logic
  useEffect(() => {
    // Check if it's computer's move
    if (state.playingWithBot && state.currentTurn === state.botPlayingWith && !state.isRoundEnded && state.hideEntryScreen) {
      // Set a timeout so he doesn't make his move instantly
      setTimeout(() => {
        // Initializing code
        let pickedCell: string = "";
        let computerOccupiedCells: string[];
        let opponentOccupiedCells: string[];
        if (state.botPlayingWith === "X") {
          computerOccupiedCells = state.X;
          opponentOccupiedCells = state.O;
        } else {
          computerOccupiedCells = state.O;
          opponentOccupiedCells = state.X;
        }
        let availableCells: string[] = [];
        for (let i = 1; i < 10; i++) {
          if (
            state.O.indexOf(i.toString()) === -1 &&
            state.X.indexOf(i.toString()) === -1
          ) {
            availableCells.push(i.toString());
          }
        }
        // If computer is 1 turn away from winning, he won't miss it!
        // Iterate through all winning combinations
        for (let i = 0; i < winningCombinations.length; i++) {
          // See which exactly winning combination cells are occupied
          let matchingCells: string[] = [];

          // Iterate through all computer's occupied cells
          for (let j = 0; j < computerOccupiedCells.length; j++) {
            // Check if winning combination contains one of computer's occupied cells
            if (
              winningCombinations[i].indexOf(computerOccupiedCells[j]) !== -1
            ) {
              matchingCells.push(computerOccupiedCells[j]);
              if (matchingCells.length === 2) {
                // Pick a 3rd piece of winning combination if it's available
                for (let k = 0; k < winningCombinations[i].length; k++) {
                  if (
                    winningCombinations[i][k] !== matchingCells[0] &&
                    winningCombinations[i][k] !== matchingCells[1] &&
                    availableCells.indexOf(winningCombinations[i][k]) !== -1
                  ) {
                    pickedCell = winningCombinations[i][k];
                  }
                }
              }
            }
          }
        }
        if (pickedCell === "") {
          // If opponent is 1 turn away from winning, computer will stop him
          for (let i = 0; i < winningCombinations.length; i++) {
            // See which exactly winning combination cells are occupied
            let matchingCells: string[] = [];

            // Iterate through all computer's occupied cells
            for (let j = 0; j < opponentOccupiedCells.length; j++) {
              // Check if winning combination contains one of opponent's occupied cells
              if (
                winningCombinations[i].indexOf(opponentOccupiedCells[j]) !==
                -1
              ) {
                matchingCells.push(opponentOccupiedCells[j]);
                if (matchingCells.length === 2) {
                  // Find a 3rd piece of winning combination if it's available
                  for (let k = 0; k < winningCombinations[i].length; k++) {
                    if (
                      winningCombinations[i][k] !== matchingCells[0] &&
                      winningCombinations[i][k] !== matchingCells[1] &&
                      availableCells.indexOf(winningCombinations[i][k]) !== -1
                    ) {
                      pickedCell = winningCombinations[i][k];
                    }
                  }
                }
              }
            }
          }
        }
        

        if (state.O.length + state.X.length === 0 && pickedCell === "") {
          pickedCell = "5";
        }

        // If still no cells picked, pick random cell
        if (pickedCell === "") {
          pickedCell = randomElementFromArray(availableCells);
        }

        dispatch({ type: "register_turn", payload: pickedCell });
        dispatch({ type: "check_round_winner", payload: "" });
      }, 400);
    }
  })
  
  return (
    <GameContext.Provider value={{ dispatch, state }}>
      <div className={state.hideEntryScreen ? "hidden" : "entry-screen scale-in"}>
        <div className={state.isGameStarted ? "header scale-out" : "header scale-in"}>Tic Tac Toe</div>
        <NewGameButtons />
      </div>
      <div className={state.hideEntryScreen ? "game-screen" : "hidden"}>
        <Display />
        <GameGrid />
      </div>
    </GameContext.Provider>
  );
}

export default App;