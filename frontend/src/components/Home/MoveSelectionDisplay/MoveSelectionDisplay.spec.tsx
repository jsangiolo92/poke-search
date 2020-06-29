import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import MoveSelectionDisplay from "./MoveSelectionDisplay";
import { MovesContext } from "../../../context/MovesContext";
import { mockMove, mockMovesContext } from "../../../data/mock-data";

const renderWithContext = (context) => {
  return render(
    <MovesContext.Provider value={context}>
      <MoveSelectionDisplay />
    </MovesContext.Provider>,
  );
};

afterEach(() => {
  jest.clearAllMocks();
});

it("renders the title span", () => {
  const { getByText } = renderWithContext(mockMovesContext);
  getByText("Currently Selected Moves");
});

it("calls dispatch to clear selected moves", () => {
  const { getByText } = renderWithContext(mockMovesContext);
  const button = getByText("Clear All Selections");

  fireEvent.click(button, { button: 1 });
  expect(mockMovesContext.dispatch).toBeCalledTimes(1);
  expect(mockMovesContext.dispatch).toBeCalledWith({
    type: "CLEAR_ALL",
  });
});
