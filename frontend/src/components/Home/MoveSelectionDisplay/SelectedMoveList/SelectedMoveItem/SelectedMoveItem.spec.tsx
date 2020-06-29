import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectedMoveItem from "./SelectedMoveItem";
import { mockMove } from "../../../../../data/mock-data";

const props = {
  move: mockMove,
  removeSelectedMove: jest.fn(),
};

afterEach(() => {
  jest.resetAllMocks();
});

it("displays the selected move's name", () => {
  const { getByText } = render(<SelectedMoveItem {...props} />);
  getByText("pound");
});

it("calls the removeSelectedMove function with the move when clicked", () => {
  const { getByTestId } = render(<SelectedMoveItem {...props} />);
  const icon = getByTestId("xIcon");

  fireEvent.click(icon, { button: 1 });

  expect(props.removeSelectedMove).toBeCalledTimes(1);
  expect(props.removeSelectedMove).toBeCalledWith(mockMove);
});
