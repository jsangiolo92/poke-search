import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import PokemonCardList from "./PokemonCardList";
import { mockTransformedPokemon, mockDetailsContext } from "../../../data/mock-data";
import { ModalDetailsContext } from "../../../context/ModalDetailsContext";

const props = {
  displayedPokemon: [mockTransformedPokemon],
  runMovesFilter: jest.fn(),
};

const initialPokemon = { ...mockTransformedPokemon, id: 0 };

const renderWithContext = (componentProps) => {
  return render(
    <ModalDetailsContext.Provider value={mockDetailsContext}>
      <PokemonCardList {...componentProps} />
    </ModalDetailsContext.Provider>,
  );
};

it("renders loading when the initial pokemon is in displayedPokemon", () => {
  const p = { ...props, displayedPokemon: [initialPokemon] };
  const { getByText, queryByText } = render(<PokemonCardList {...p} />);
  getByText("Loading...");
  expect(queryByText("No Results for current Filters")).not.toBeInTheDocument();
});

it("renders a message when no pokemon match the filters", () => {
  const p = { ...props, displayedPokemon: [] };
  const { getByText, queryByText } = render(<PokemonCardList {...p} />);
  getByText("No Results for current Filters");
  expect(queryByText("Loading...")).not.toBeInTheDocument();
});

it("renders the filtered pokemon", () => {
  const { getByText, queryByText } = renderWithContext(props);
  getByText(props.displayedPokemon[0].name);
  expect(queryByText("Loading...")).not.toBeInTheDocument();
  expect(queryByText("No Results for current Filters")).not.toBeInTheDocument();
});
