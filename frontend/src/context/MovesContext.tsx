import React, { createContext, useReducer } from "react";
import { Move } from "../types";

type MoveAction = {
  type: string;
  selectedMove?: Move;
  allMoves?: Move[];
};

type MovesState = {
  selectedMoves: Move[];
  allMoves: Move[];
};

const MovesContext = createContext(null);

const initialState: MovesState = { selectedMoves: [], allMoves: [] };
const selectedMovesContextReducer = (state: MovesState, action: MoveAction) => {
  let newState;
  switch (action.type) {
    case "ADD_MOVE":
      newState = { ...state, selectedMoves: [...state.selectedMoves, action.selectedMove] };
      return newState;
    case "REMOVE_MOVE":
      newState = { ...state, selectedMoves: state.selectedMoves.filter((m: Move) => m.id !== action.selectedMove.id) };
      return newState;
    case "CLEAR_ALL":
      return { ...state, selectedMoves: [] };
    case "LOAD_ALL_MOVES":
      newState = { ...state, allMoves: action.allMoves };
      return newState;
    default:
      return state;
  }
};

const MovesContextProvider = ({ children }) => {
  const [selectedMovesState, dispatch] = useReducer(selectedMovesContextReducer, initialState);
  return <MovesContext.Provider value={{ selectedMovesState, dispatch }}>{children}</MovesContext.Provider>;
};

export { MovesContext, MovesContextProvider };
