import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import PokemonResults from "./PokemonResults";
import { MovesContext } from "../../context/MovesContext";
import { PokemonContext } from "../../context/PokemonContext";
import { mockMovesContext, mockPokemonContext, mockDetailsContext } from "../../data/mock-data";
import { ModalDetailsContext } from "../../context/ModalDetailsContext";

const additionalMockPokemon = {
  id: 5,
  moves: {
    ember: {
      damageClass: "physical",
      name: "ember",
      type: "fire",
      versionData: [{ learnMethod: "machine", version: "red-blue" }],
    },
  },
  name: "Charmander",
  types: ["fire"],
};

const updateContext = (context, pokemon) => {
  return {
    ...context,
    pokemonState: mockPokemonContext.pokemonState.concat(pokemon),
  };
};

const renderWithContext = (pokeContext) => {
  return render(
    <MovesContext.Provider value={mockMovesContext}>
      <PokemonContext.Provider value={pokeContext}>
        <ModalDetailsContext.Provider value={mockDetailsContext}>
          <PokemonResults />
        </ModalDetailsContext.Provider>
      </PokemonContext.Provider>
    </MovesContext.Provider>,
  );
};

it("filters the pokemon by selected moves", () => {
  const context = updateContext(mockPokemonContext, additionalMockPokemon);
  const { getByText, queryByText } = renderWithContext(context);
  getByText("Bulbasaur");
  expect(queryByText("Charmander")).not.toBeInTheDocument();
});

it("filters by pokemon type", () => {
  const extraPokemon = {
    ...additionalMockPokemon,
    moves: {
      pound: {
        damageClass: "physical",
        name: "pound",
        type: "normal",
        versionData: [{ learnMethod: "machine", version: "red-blue" }],
      },
    },
  };
  const context = updateContext(mockPokemonContext, extraPokemon);

  const { getByText, queryByText } = renderWithContext(context);
  getByText("Bulbasaur");
  getByText("Charmander");

  const fireButton = getByText("Fire");
  fireEvent.click(fireButton, { button: 1 });

  getByText("Charmander");
  expect(queryByText("Bulbasaur")).not.toBeInTheDocument();
});

it("filters by version", () => {
  const extraPokemon = {
    ...additionalMockPokemon,
    moves: {
      pound: {
        damageClass: "physical",
        name: "pound",
        type: "normal",
        versionData: [{ learnMethod: "machine", version: "gold-silver" }],
      },
    },
  };

  const context = updateContext(mockPokemonContext, extraPokemon);

  const { getByText, queryByText } = renderWithContext(context);
  getByText("Bulbasaur");
  getByText("Charmander");

  const goldButton = getByText("Gold");
  fireEvent.click(goldButton, { button: 1 });

  getByText("Charmander");
  expect(queryByText("Bulbasaur")).not.toBeInTheDocument();
});

it("filters by learn method", () => {
  const extraPokemon = {
    ...additionalMockPokemon,
    moves: {
      pound: {
        damageClass: "physical",
        name: "pound",
        type: "normal",
        versionData: [{ learnMethod: "level-up", version: "gold-silver" }],
      },
    },
  };

  const context = updateContext(mockPokemonContext, extraPokemon);

  const { getByText, queryByText } = renderWithContext(context);
  getByText("Bulbasaur");
  getByText("Charmander");

  const machineButton = getByText("Technical Machine");
  fireEvent.click(machineButton, { button: 1 });

  getByText("Bulbasaur");
  expect(queryByText("Charmander")).not.toBeInTheDocument();
});
