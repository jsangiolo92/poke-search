import { LoaderService } from "../service/LoaderService";
import { Logger } from "../service/Logger";

const logger = new Logger();

const moveLimit = 5;
const pokemonLimit = 5;

const mockAxiosMovesResponse = {
  data: {
    id: 1,
    name: "pound",
    type: {
      name: "normal",
    },
    damage_class: {
      name: "physical",
    },
  },
};

const mockAxiosPokemonResponse = {
  data: {
    id: 1,
    name: "Bulbasaur",
    types: [{ type: { name: "grass" } }],
    moves: [
      {
        move: {
          name: "pound",
        },
        version_group_details: [
          {
            level_learned_at: 0,
            move_learn_method: {
              name: "machine",
            },
            version_group: {
              name: "red-blue",
            },
          },
        ],
      },
    ],
  },
};

const mockMovesData = {
  pound: {
    id: moveLimit - 1,
    name: "pound",
    type: "normal",
    damageClass: "physical",
  },
};

const mockPokemonData = {
  Bulbasaur: {
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
  },
};

const mockRepo = {
  loadData: jest.fn().mockReturnValue(Promise.resolve("Success")),
  getMoveTypes: jest.fn().mockReturnValue(Promise.resolve(mockMovesData)),
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("moves object creation", () => {
  const mockAxios = {
    get: jest.fn().mockReturnValue(Promise.resolve(mockAxiosMovesResponse)),
  };
  const service = new LoaderService(mockRepo, logger, moveLimit, pokemonLimit, mockAxios);

  it("calls the redis repo", async () => {
    await service.buildAndLoadMoveTypesObj();
    expect(mockRepo.loadData).toBeCalledWith("moveTypes", mockMovesData);
  });

  it("uses Axios once per number of moves needed", async () => {
    await service.buildAndLoadMoveTypesObj();
    expect(mockAxios.get).toBeCalledTimes(moveLimit - 1);
  });
});

describe("pokemon object creation", () => {
  const mockAxios = {
    get: jest.fn().mockReturnValue(Promise.resolve(mockAxiosPokemonResponse)),
  };
  const service = new LoaderService(mockRepo, logger, moveLimit, pokemonLimit, mockAxios);

  it("calls the redis repo for moves data and to save the pokemon data", async () => {
    await service.buildAndLoadPokemonObj();
    expect(mockRepo.getMoveTypes).toBeCalledTimes(1);
    expect(mockRepo.loadData).toBeCalledWith("pokemon", mockPokemonData);
  });

  it("uses Axios once per number of pokemon needed", async () => {
    await service.buildAndLoadPokemonObj();
    expect(mockAxios.get).toBeCalledTimes(pokemonLimit - 1);
  });
});

describe("helper methods", () => {
  const service = new LoaderService(mockRepo, logger, moveLimit, pokemonLimit, {});
  service["completeMovesObj"] = { pound: { type: "normal", damageClass: "physical" } };

  it("transforms raw type data to simple array", () => {
    const result = service["transformTypeData"](mockAxiosPokemonResponse.data.types);
    expect(result).toEqual(mockPokemonData.Bulbasaur.types);
  });

  it("transforms raw moves data to simpler object", () => {
    const result = service["transformMovesData"](mockAxiosPokemonResponse.data.moves);
    expect(result).toEqual(mockPokemonData.Bulbasaur.moves);
  });

  it("gets version data for a move without level if not a level up move", () => {
    const result = service["extractVersionMoveData"](mockAxiosPokemonResponse.data.moves[0].version_group_details);
    expect(result[0]).not.toHaveProperty("level");
    expect(result).toEqual(mockPokemonData.Bulbasaur.moves.pound.versionData);
  });

  it("gets version data for a move with level if a level up move", () => {
    const data = [
      {
        level_learned_at: 10,
        move_learn_method: {
          name: "machine",
        },
        version_group: {
          name: "red-blue",
        },
      },
    ];
    const result = service["extractVersionMoveData"](data)[0];
    expect(result).toHaveProperty("level");
    expect(result.level).toBe(10);
  });
});
