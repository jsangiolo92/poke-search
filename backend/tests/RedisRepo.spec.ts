import { RedisRepo } from "../repo/RedisRepo";

const mockRedisData = { key: "value" };

const mockFunctions = {
  addObject: jest.fn().mockReturnValue(Promise.resolve("Success")),
  getObject: jest.fn().mockReturnValue(Promise.resolve(mockRedisData)),
};

const repo = new RedisRepo(mockFunctions);

afterEach(() => {
  jest.clearAllMocks();
});

describe("getPokemonData", () => {
  it("should call the getObject method to get data from Redis", async () => {
    await repo.getPokemonData();
    expect(mockFunctions.getObject).toBeCalledWith("pokemon");
    expect(mockFunctions.getObject).toBeCalledTimes(1);
  });

  it("should return the data from redis", async () => {
    const data = await repo.getPokemonData();
    expect(data).toBe(mockRedisData);
  });
});

describe("getMoveTypes", () => {
  it("should call the getObject method to get data from Redis", async () => {
    await repo.getMoveTypes();
    expect(mockFunctions.getObject).toBeCalledWith("moveTypes");
    expect(mockFunctions.getObject).toBeCalledTimes(1);
  });

  it("should return the data from redis", async () => {
    const data = await repo.getMoveTypes();
    expect(data).toBe(mockRedisData);
  });
});

describe("loadData", () => {
  it("should provide the redis functions with a key and data to load", async () => {
    const key = "key";
    await repo.loadData(key, mockRedisData);
    expect(mockFunctions.addObject).toBeCalledWith(key, mockRedisData);
    expect(mockFunctions.addObject).toBeCalledTimes(1);
  });
});
