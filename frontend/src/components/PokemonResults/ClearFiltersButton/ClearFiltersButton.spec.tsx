import React from "react";
import { render } from "@testing-library/react";
import ClearFiltersButton from "./ClearFiltersButton";

const props = {
  runMovesFilter: jest.fn(),
};

it("renders the button", () => {
  const { getByText } = render(<ClearFiltersButton {...props} />);
  getByText("Remove Filters");
});
