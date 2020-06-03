import React, { createContext, useReducer } from "react";

const PokemonContext = createContext(null);

const initialState = [];
const pokemonContextReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_POKEMON":
      return action.pokemon;
    default:
      return state;
  }
};

const PokemonContextProvider = ({ children }) => {
  const [pokemonState, dispatch] = useReducer(
    pokemonContextReducer,
    initialState,
  );
  return (
    <PokemonContext.Provider value={{ pokemonState, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonContextProvider };
