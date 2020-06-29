import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import FilterSelectionDisplay from "./FilterSelectionDisplay";

const props = {
  filters: {
    moves: ["pound"],
    pokemonType: "normal",
    version: "red",
    learnMethod: "machine",
  },
};

it("displays all info when all filters are in use", () => {
  const { getByText } = render(<FilterSelectionDisplay {...props} />);
  getByText("pound");
  getByText("normal");
  getByText("red");
  getByText("machine");
});

it("does not render empty filters", () => {
  const p = { ...props, version: "" };
  const { queryByText } = render(<FilterSelectionDisplay {...p} />);
  expect(queryByText("version")).not.toBeInTheDocument();
});
