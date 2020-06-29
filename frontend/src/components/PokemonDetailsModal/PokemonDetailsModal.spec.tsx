import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PokemonDetailsModal from "./PokemonDetailsModal";
import { ModalDetailsContext } from "../../context/ModalDetailsContext";
import { mockDetailsContext, mockTransformedPokemon } from "../../data/mock-data";

const renderWithContext = (context) => {
  return render(
    <ModalDetailsContext.Provider value={context}>
      <PokemonDetailsModal />
    </ModalDetailsContext.Provider>,
  );
};

it("formats pokemon and move names before displaying them", () => {
  const context = {
    ...mockDetailsContext,
    detailsState: {
      ...mockDetailsContext.detailsState,
      details: {
        ...mockTransformedPokemon,
        name: "charmander",
      },
      open: true,
    },
  };

  context.detailsState.details.moves[0].name = "fire-punch";

  const { getByText } = renderWithContext(context);
  getByText("Charmander");
  getByText("Fire Punch");
});

it("closes the modal when clicked outside of it", () => {
  const context = {
    ...mockDetailsContext,
    detailsState: {
      ...mockDetailsContext.detailsState,
      open: true,
    },
  };

  const { getByText } = renderWithContext(context);
  fireEvent.keyDown(getByText("Bulbasaur"), {
    key: "Escape",
    code: "Escape",
    keyCode: 27,
    charCode: 27,
  });

  expect(context.dispatch).toBeCalledTimes(1);
  expect(context.dispatch).toBeCalledWith({
    type: "CLOSE",
  });
});
