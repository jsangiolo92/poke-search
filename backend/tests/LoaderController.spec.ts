import { LoaderController } from "../controller/LoaderController";
import { expressMocks } from "./mock-data";

const { mockReq, mockRes, mockNext } = expressMocks;

const mockService = {
  buildAndLoadMoveTypesObj: jest.fn(),
  buildAndLoadPokemonObj: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
});

const controller = new LoaderController(mockService);

describe("loadRedisWithMoveTypes", () => {
  it("calls the service and returns", () => {
    controller.loadRedisWithMoveTypes(mockReq, mockRes, mockNext);
    expect(mockService.buildAndLoadMoveTypesObj).toBeCalledTimes(1);
    expect(mockRes.send).toBeCalledTimes(1);
    expect(mockRes.send).toBeCalledWith("Move Type loading process started");
  });
});

describe("loadRedisWithPokemonData", () => {
  it("calls the service and returns", () => {
    controller.loadRedisWithPokemonData(mockReq, mockRes, mockNext);
    expect(mockService.buildAndLoadPokemonObj).toBeCalledTimes(1);
    expect(mockRes.send).toBeCalledTimes(1);
    expect(mockRes.send).toBeCalledWith("Pokemon loading process started");
  });
});
