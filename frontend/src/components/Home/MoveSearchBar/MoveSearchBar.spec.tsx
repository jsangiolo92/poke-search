import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MoveSearchBar from "./MoveSearchBar";
import { SearchContext } from "../../../context/SearchContext";
import { mockSearchContext } from "../../../data/mock-data";

const renderWithContext = (context) => {
  return render(
    <SearchContext.Provider value={context}>
      <MoveSearchBar />
    </SearchContext.Provider>,
  );
};

it("renders the search bar", () => {
  const { getByPlaceholderText } = renderWithContext(mockSearchContext);
  getByPlaceholderText("Search for a move");
});

it("dispatches user input to context", () => {
  const { getByPlaceholderText } = renderWithContext(mockSearchContext);
  const input = getByPlaceholderText("Search for a move");

  fireEvent.change(input, { target: { value: "pound" } });

  expect(mockSearchContext.dispatch).toBeCalledTimes(1);
  expect(mockSearchContext.dispatch).toBeCalledWith({
    type: "UPDATE",
    input: "pound",
  });
});
