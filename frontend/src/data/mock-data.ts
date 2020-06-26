export const mockMove = {
  id: 1,
  name: "pound",
  type: "normal",
  damageClass: "physical",
};

export const mockPokemon = {
  id: 4,
  moves: {
    pound: {
      damageClass: "physical",
      name: "pound",
      type: "normal",
      versionData: [{ learnMethod: "machine", version: "red-blue" }],
    },
  },
  name: "Bulbasaur",
  types: ["grass"],
};

export const mockMovesContext = {
  dispatch: jest.fn(),
  selectedMovesState: { selectedMoves: [mockMove], allMoves: [] },
};

export const mockSearchContext = {
  dispatch: jest.fn(),
  searchState: "",
};

export const mockPokemonContext = {
  dispatch: jest.fn(),
  pokemonState: [mockPokemon],
};
