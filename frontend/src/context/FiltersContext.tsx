import React, { createContext, useReducer } from "react";

type Filters = {
  moves: string[];
  pokemonType: string;
  version: string;
  learnMethod: string;
};

type FilterAction = {
  type: string;
  filters: Filters;
};

type FilterState = {
  moves: string[];
  pokemonType: string;
  version: string;
  learnMethod: string;
};

const FiltersContext = createContext(null);

const initialFilterState: FilterState = {
  moves: [],
  pokemonType: null,
  version: null,
  learnMethod: null,
};

const filtersContextReducer = (state: FilterState, action: FilterAction) => {
  switch (action.type) {
    case "UPDATE_FILTERS":
      return { ...state, ...action.filters };
    case "CLEAR":
      return { ...initialFilterState, ...action.filters };
    default:
      return state;
  }
};

const FiltersContextProvider = ({ children }) => {
  const [filtersState, dispatch] = useReducer(filtersContextReducer, initialFilterState);
  return <FiltersContext.Provider value={{ filtersState, dispatch }}>{children}</FiltersContext.Provider>;
};

export { FiltersContext, FiltersContextProvider };
