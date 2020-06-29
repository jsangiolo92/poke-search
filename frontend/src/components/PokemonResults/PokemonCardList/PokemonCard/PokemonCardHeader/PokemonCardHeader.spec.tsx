import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { mockDetailsContext, mockTransformedPokemon } from "../../../../../data/mock-data";
import { ModalDetailsContext } from "../../../../../context/ModalDetailsContext";
import PokemonCardHeader from "./PokemonCardHeader";

const props = {
  ...mockTransformedPokemon,
};

const renderWithContext = (context, componentProps) => {
  return render(
    <ModalDetailsContext.Provider value={context}>
      <PokemonCardHeader {...componentProps} />
    </ModalDetailsContext.Provider>,
  );
};

afterEach(() => {
  jest.resetAllMocks();
});

it("renders the name from props", () => {
  const { getByText } = renderWithContext(mockDetailsContext, props);
  getByText(mockTransformedPokemon.name);
});

it("dispatches OPEN when a header is clicked", () => {
  const { getByText } = renderWithContext(mockDetailsContext, props);
  const header = getByText(mockTransformedPokemon.name);

  // const dispatchData = { ...mockPokemon, moves: Object.keys(mockPokemon.moves).map((key) => mockPokemon.moves[key]) };

  fireEvent.click(header, { button: 1 });
  expect(mockDetailsContext.dispatch).toBeCalledTimes(1);
  expect(mockDetailsContext.dispatch).toBeCalledWith({
    type: "OPEN",
    details: mockTransformedPokemon,
  });
});
