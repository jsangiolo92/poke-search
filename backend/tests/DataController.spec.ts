import { DataController } from "../controller/DataController";
import { Logger } from "../service/Logger";
import { expressMocks } from "./mock-data";

const logger = new Logger();
const { mockReq, mockRes, mockNext } = expressMocks;

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

const mockService = {
  fetchPokemonData: async () => Promise.resolve(mockPokemonData),
  fetchMovesData: async () => Promise.resolve(mockMovesData),
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("getAllPokemonData", () => {
  let controller = new DataController(mockService, logger);

  it("calls the response object's send method with a 200 status code", async () => {
    await controller.getAllPokemonData(mockReq, mockRes, mockNext);

    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.send).toBeCalledTimes(1);
    expect(mockNext).not.toBeCalled();
  });

  it("GETs pokemon data", async () => {
    await controller.getAllPokemonData(mockReq, mockRes, mockNext);

    expect(mockRes.send).toBeCalledWith(
      expect.objectContaining({
        pokemon: mockPokemonData,
      }),
    );
  });

  it("calls the next method when an error occurs", async () => {
    mockService.fetchPokemonData = async () => {
      throw new Error("Test Error");
    };

    controller = new DataController(mockService, logger);
    await controller.getAllPokemonData(mockReq, mockRes, mockNext);

    expect(mockRes.send).not.toBeCalled();
    expect(mockNext).toBeCalledTimes(1);
  });
});

describe("getMovesData", () => {
  let controller = new DataController(mockService, logger);

  it("calls the response object's send method with a 200 status code", async () => {
    await controller.getMovesData(mockReq, mockRes, mockNext);

    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.send).toBeCalledTimes(1);
    expect(mockNext).not.toBeCalled();
  });

  it("GETs the moves data", async () => {
    await controller.getMovesData(mockReq, mockRes, mockNext);

    expect(mockRes.send).toBeCalledWith(
      expect.objectContaining({
        moves: mockMovesData,
      }),
    );
  });

  it("calls the next method when an error occurs", async () => {
    mockService.fetchMovesData = async () => {
      throw new Error("Test Error");
    };

    controller = new DataController(mockService, logger);
    await controller.getMovesData(mockReq, mockRes, mockNext);

    expect(mockRes.send).not.toBeCalled();
    expect(mockNext).toBeCalledTimes(1);
  });
});
