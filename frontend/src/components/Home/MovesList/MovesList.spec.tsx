import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import MovesList from "./MovesList";
import { MovesContext } from "../../../context/MovesContext";
import { SearchContext } from "../../../context/SearchContext";
import { mockMove, mockMovesContext, mockSearchContext } from "../../../data/mock-data";
import { act } from "react-dom/test-utils";

const fetch = window.fetch;
const mockApiMovesResponse = {
  pound: mockMove,
};

beforeEach(() => {
  window.fetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () => Promise.resolve({ moves: mockApiMovesResponse }),
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  window.fetch = fetch;
});

const renderWithContext = (movesContext, searchContext) => {
  return render(
    <MovesContext.Provider value={movesContext}>
      <SearchContext.Provider value={searchContext}>
        <MovesList />
      </SearchContext.Provider>
    </MovesContext.Provider>,
  );
};

it("shows loading when moves are unavailable", () => {
  let getByText;
  act(() => {
    getByText = renderWithContext(mockMovesContext, mockSearchContext).getByText;
  });
  getByText("Loading...");
});

it("does not show loading once moves are available", () => {
  const movesContext = {
    ...mockMovesContext,
    selectedMovesState: { ...mockMovesContext.selectedMovesState, allMoves: [mockMove] },
  };

  const { queryByText } = renderWithContext(movesContext, mockSearchContext);
  expect(queryByText("Loading...")).not.toBeInTheDocument();
});

it("calls fetch when moves aren't in state", (done) => {
  act(() => {
    renderWithContext(mockMovesContext, mockSearchContext);
  });

  expect(window.fetch).toBeCalledTimes(1);

  requestAnimationFrame(() => {
    expect(mockMovesContext.dispatch).toBeCalledTimes(1);
    expect(mockMovesContext.dispatch).toBeCalledWith({
      type: "LOAD_ALL_MOVES",
      allMoves: [mockMove],
    });
    done();
  });
});

it("does not call fetch when moves are already available", () => {
  const movesContext = {
    ...mockMovesContext,
    selectedMovesState: { ...mockMovesContext.selectedMovesState, allMoves: [mockMove] },
  };

  renderWithContext(movesContext, mockSearchContext);

  expect(window.fetch).toBeCalledTimes(0);
});

it("clears the search bar when loaded", () => {
  const movesContext = {
    ...mockMovesContext,
    selectedMovesState: { ...mockMovesContext.selectedMovesState, allMoves: [mockMove] },
  };

  renderWithContext(movesContext, mockSearchContext);

  expect(mockSearchContext.dispatch).toBeCalledTimes(1);
  expect(mockSearchContext.dispatch).toBeCalledWith({
    type: "UPDATE",
    input: "",
  });
});

it("displays all moves before searching", () => {
  const movesContext = {
    ...mockMovesContext,
    selectedMovesState: { ...mockMovesContext.selectedMovesState, allMoves: [mockMove] },
  };

  const { getByText } = renderWithContext(movesContext, mockSearchContext);
  getByText("pound");
});

it("displays moves that include user inputed characters when searching", () => {
  const movesContext = {
    ...mockMovesContext,
    selectedMovesState: { ...mockMovesContext.selectedMovesState, allMoves: [mockMove] },
  };

  const { queryByText, rerender } = renderWithContext(movesContext, mockSearchContext);

  const searchContext = { ...mockSearchContext, searchState: "z" };

  rerender(
    <MovesContext.Provider value={movesContext}>
      <SearchContext.Provider value={searchContext}>
        <MovesList />
      </SearchContext.Provider>
    </MovesContext.Provider>,
  );

  expect(queryByText("pound")).not.toBeInTheDocument();
});
