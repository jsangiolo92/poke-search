import React, { createContext, useReducer } from "react";
import { Pokemon } from "../types";

type DetailsAction = {
  type: string;
  details: Pokemon;
};

type DetailsState = {
  details: Pokemon;
  open: boolean;
};

const ModalDetailsContext = createContext(null);

const initialState: DetailsState = {
  details: { id: null, name: null, moves: null, types: null },
  open: false,
};

const modalDetailsContextReducer = (state: DetailsState, action: DetailsAction) => {
  switch (action.type) {
    case "OPEN":
      return { details: { ...action.details }, open: true };
    case "CLOSE":
      return { ...initialState };
    default:
      return state;
  }
};

const ModalDetailsContextProvider = ({ children }) => {
  const [detailsState, dispatch] = useReducer(modalDetailsContextReducer, initialState);
  return <ModalDetailsContext.Provider value={{ detailsState, dispatch }}>{children}</ModalDetailsContext.Provider>;
};

export { ModalDetailsContext, ModalDetailsContextProvider };
