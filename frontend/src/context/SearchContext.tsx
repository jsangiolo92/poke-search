import React, { createContext, useReducer } from "react";

type SearchAction = {
  type: string;
  input: string;
};

const SearchContext = createContext(null);

const initialState = "";
const searchContextReducer = (state: string, action: SearchAction) => {
  switch (action.type) {
    case "UPDATE":
      return action.input;
    default:
      return state;
  }
};

const SearchContextProvider = ({ children }) => {
  const [searchState, dispatch] = useReducer(searchContextReducer, initialState);
  return <SearchContext.Provider value={{ searchState, dispatch }}>{children}</SearchContext.Provider>;
};

export { SearchContext, SearchContextProvider };
