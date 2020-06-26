import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import MoveCard from "./MoveCard";
import { MovesContext } from "../../../../context/MovesContext";
import { mockMove, mockMovesContext } from "../../../../data/mock-data";

const props = {
  moveData: mockMove,
  selected: false,
};

const renderWithContext = (componentProps, context) => {
  return render(
    <MovesContext.Provider value={context}>
      <MoveCard {...componentProps} />
    </MovesContext.Provider>,
  );
};

afterEach(() => {
  jest.resetAllMocks();
});

it("dispatches add move to context if card is not selected", () => {
  const { getByText } = renderWithContext(props, mockMovesContext);
  const card = getByText("pound");

  fireEvent.click(card, { button: 1 });
  expect(mockMovesContext.dispatch).toBeCalledTimes(1);
  expect(mockMovesContext.dispatch).toBeCalledWith({
    type: "ADD_MOVE",
    selectedMove: mockMove,
  });
});

it("dispatches remove move to context if card is already selected", () => {
  const p = { ...props, selected: true };
  const { getByText } = renderWithContext(p, mockMovesContext);
  const card = getByText("pound");

  fireEvent.click(card, { button: 1 });
  expect(mockMovesContext.dispatch).toBeCalledTimes(1);
  expect(mockMovesContext.dispatch).toBeCalledWith({
    type: "REMOVE_MOVE",
    selectedMove: mockMove,
  });
});
