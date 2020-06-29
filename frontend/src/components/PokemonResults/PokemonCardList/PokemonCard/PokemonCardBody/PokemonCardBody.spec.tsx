import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import PokemonCardBody from "./PokemonCardBody";

const props = {
  types: ["grass", "poison"],
};

it("renders the types from props", () => {
  const { getByText, queryByText } = render(<PokemonCardBody {...props} />);
  props.types.forEach((type) => getByText(type.toUpperCase()));
  expect(queryByText("fire")).not.toBeInTheDocument();
});
