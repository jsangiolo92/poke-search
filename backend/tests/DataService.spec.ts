import { DataService } from "../service/DataService";

const mockPokemonData = {
  bulbasaur: {
    id: 1,
    name: "bulbasaur",
    types: ["grass", "poison"],
    moves: {},
  },
};

const mockMovesData = {
  pound: {
    id: 1,
    name: "pound",
    type: "normal",
    damageClass: "physical",
  },
};

const mockRepo = {
  getPokemonData: jest.fn().mockReturnValue(Promise.resolve(mockPokemonData)),
  getMoveTypes: jest.fn().mockReturnValue(Promise.resolve(mockMovesData)),
};

const service = new DataService(mockRepo);

afterEach(() => {
  jest.clearAllMocks();
});

describe("fetchPokemonData", () => {
  it("calls the Redis repo for the pokemon data", async () => {
    await service.fetchPokemonData();
    expect(mockRepo.getPokemonData).toBeCalledTimes(1);
  });

  it("returns pokemon data from the Redis repo", async () => {
    const data = await service.fetchPokemonData();
    expect(data).toBe(mockPokemonData);
  });
});

describe("fetchMovesData", () => {
  it("calls the Redis repo for the movesdata", async () => {
    await service.fetchMovesData();
    expect(mockRepo.getMoveTypes).toBeCalledTimes(1);
  });

  it("returns moves data from the Redis repo", async () => {
    const data = await service.fetchMovesData();
    expect(data).toBe(mockMovesData);
  });
});
