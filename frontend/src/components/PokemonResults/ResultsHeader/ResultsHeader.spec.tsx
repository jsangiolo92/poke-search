import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import ResultsHeader from "./ResultsHeader";

const props = {
  filters: {
    moves: ["pound"],
    pokemonType: "",
    version: "",
    learnMethod: "",
  },
  runMovesFilter: jest.fn(),
};

it("should render the clear filters button when at least one filter is selected", () => {
  const p = { ...props, filters: { ...props.filters, version: "red" } };
  const { getByText } = render(<ResultsHeader {...p} />);
  getByText("Remove Filters");
});

it("should not render the clear filters button when none are selected", () => {
  const { queryByText } = render(<ResultsHeader {...props} />);
  expect(queryByText("Remove Filters")).not.toBeInTheDocument();
});
