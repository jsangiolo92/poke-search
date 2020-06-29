import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Home from "./Home";
import { mockPokemon, mockMove, mockPokemonContext, mockMovesContext, mockSearchContext } from "../../data/mock-data";
import { PokemonContext } from "../../context/PokemonContext";
import { MovesContext } from "../../context/MovesContext";
import { SearchContext } from "../../context/SearchContext";

const fetch = window.fetch;
const mockApiPokemonResponse = { bulbasaur: mockPokemon };
const movesContext = {
  ...mockMovesContext,
  selectedMovesState: { ...mockMovesContext.selectedMovesState, allMoves: [mockMove] },
};

const renderWithContext = (pokemonContext) => {
  return render(
    <MovesContext.Provider value={movesContext}>
      <SearchContext.Provider value={mockSearchContext}>
        <PokemonContext.Provider value={pokemonContext}>
          <Home />
        </PokemonContext.Provider>
      </SearchContext.Provider>
    </MovesContext.Provider>,
  );
};

beforeEach(() => {
  window.fetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () => Promise.resolve({ pokemon: mockApiPokemonResponse }),
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  window.fetch = fetch;
});

it("calls fetch and dispatch when pokemon state is not available", (done) => {
  const pokemonContext = { ...mockPokemonContext, pokemonState: [] };
  renderWithContext(pokemonContext);

  expect(window.fetch).toBeCalledTimes(1);

  requestAnimationFrame(() => {
    expect(mockPokemonContext.dispatch).toBeCalledTimes(1);
    expect(mockPokemonContext.dispatch).toBeCalledWith({
      type: "UPDATE_POKEMON",
      pokemon: [mockPokemon],
    });
    done();
  });
});

it("does not call fetch and dispatch if pokemon state is already available", () => {
  renderWithContext(mockPokemonContext);
  expect(window.fetch).toBeCalledTimes(0);
  expect(mockPokemonContext.dispatch).toBeCalledTimes(0);
});
