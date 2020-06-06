import React, { createContext, useReducer } from "react";

type Move = {
  id: number;
  name: string;
  type: string;
  damageClass: string;
};

type SelectedMoveAction = {
  type: string;
  move: Move;
};

type MovesState = {
  selectedMoves: Move[];
  allMoves: Move[];
};

const SelectedMovesContext = createContext(null);

const initialState = [];
const selectedMovesContextReducer = (state: Move[], action: SelectedMoveAction) => {
  switch (action.type) {
    case "ADD_MOVE":
      const newState = [...state, action.move];
      return newState;
    case "REMOVE_MOVE":
      const moves = state.filter((m: Move) => m.id !== action.move.id);
      return moves;
    case "CLEAR_ALL":
      return [];
    default:
      return state;
  }
};

const SelectedMovesContextProvider = ({ children }) => {
  const [selectedMovesState, dispatch] = useReducer(selectedMovesContextReducer, initialState);
  return (
    <SelectedMovesContext.Provider value={{ selectedMovesState, dispatch }}>{children}</SelectedMovesContext.Provider>
  );
};

export { SelectedMovesContext, SelectedMovesContextProvider };
