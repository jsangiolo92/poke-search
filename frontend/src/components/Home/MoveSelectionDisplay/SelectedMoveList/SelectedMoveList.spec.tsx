import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import SelectedMoveList from "./SelectedMoveList";
import { mockMove } from "../../../../data/mock-data";

const props = {
  selectedMoves: [mockMove, { ...mockMove, id: 2, name: "tackle" }],
  removeSelectedMove: jest.fn(),
};

it("renders each selected move", () => {
  const { getByText, queryByText } = render(<SelectedMoveList {...props} />);

  getByText("pound");
  getByText("tackle");
  expect(queryByText("thunder")).not.toBeInTheDocument();
});
