import React from "react";
import { render } from "@testing-library/react";
import PokemonCard from "./PokemonCard";
import { mockTransformedPokemon, mockDetailsContext } from "../../../../data/mock-data";
import { ModalDetailsContext } from "../../../../context/ModalDetailsContext";

const props = {
  pokemon: mockTransformedPokemon,
};

const renderWithContext = () => {
  return render(
    <ModalDetailsContext.Provider value={mockDetailsContext}>
      <PokemonCard {...props} />
    </ModalDetailsContext.Provider>,
  );
};

it("renders the pokemon from props", () => {
  const { getByText } = renderWithContext();
  getByText(props.pokemon.name);
  getByText(props.pokemon.types[0].toUpperCase());
});
