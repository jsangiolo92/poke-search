import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import HomeButtons from "./HomeButtons";
import { mockMove } from "../../../../data/mock-data";

const props = {
  selectedMoves: [],
  goToResults: jest.fn(),
  clearSearchSelections: jest.fn(),
};

it("should not display button to clear selections when none are selected", () => {
  const { queryByText } = render(<HomeButtons {...props} />);

  expect(queryByText("Clear All Selections")).not.toBeInTheDocument();
});

it("should display button to clear selections when at least one is selected", () => {
  const p = { ...props, selectedMoves: [mockMove] };
  const { getByText } = render(<HomeButtons {...p} />);

  getByText("Clear All Selections");
});
