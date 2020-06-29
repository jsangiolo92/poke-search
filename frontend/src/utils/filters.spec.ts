import { filterVersionDataByVersion, filterVersionDataByLearnMethod } from "./filters";

const mockData = [
  {
    id: 4,
    moves: {
      pound: {
        damageClass: "physical",
        name: "dig",
        type: "normal",
        versionData: [
          {
            learnMethod: "machine",
            version: "red-blue",
          },
          {
            learnMethod: "level-up",
            version: "black-white",
            level: 40,
          },
        ],
      },
    },
    name: "sandslash",
    types: ["ground"],
  },
  {
    id: 5,
    moves: {
      pound: {
        damageClass: "physical",
        name: "dig",
        type: "normal",
        versionData: [
          {
            learnMethod: "level-up",
            version: "red-blue",
            level: 40,
          },
          {
            learnMethod: "machine",
            version: "red-blue",
          },
          {
            learnMethod: "level-up",
            version: "black-white",
            level: 40,
          },
        ],
      },
    },
    name: "dugtrio",
    types: ["ground"],
  },
  {
    id: 6,
    moves: {
      pound: {
        damageClass: "physical",
        name: "dig",
        type: "normal",
        versionData: [
          {
            learnMethod: "machine",
            version: "red-blue",
          },
        ],
      },
    },
    name: "charmander",
    types: ["fire"],
  },
];

// the functions being tested are passed already filtered values
// really what's being tested is that the objects in the results arrays are modified
describe("filters are additive", () => {
  let results = mockData.slice(0, 2);
  it("modifies the filtered pokemon by learn method", () => {
    filterVersionDataByLearnMethod(results, "level-up");
    expect(results).toEqual([
      {
        id: 4,
        moves: {
          pound: {
            damageClass: "physical",
            name: "dig",
            type: "normal",
            versionData: [
              {
                learnMethod: "level-up",
                version: "black-white",
                level: 40,
              },
            ],
          },
        },
        name: "sandslash",
        types: ["ground"],
      },
      {
        id: 5,
        moves: {
          pound: {
            damageClass: "physical",
            name: "dig",
            type: "normal",
            versionData: [
              {
                learnMethod: "level-up",
                version: "red-blue",
                level: 40,
              },
              {
                learnMethod: "level-up",
                version: "black-white",
                level: 40,
              },
            ],
          },
        },
        name: "dugtrio",
        types: ["ground"],
      },
    ]);
  });

  it("then modifies the filtered pokemon by version", () => {
    results = results.slice(1);
    filterVersionDataByVersion(results, "red-blue");
    expect(results).toEqual([
      {
        id: 5,
        moves: {
          pound: {
            damageClass: "physical",
            name: "dig",
            type: "normal",
            versionData: [
              {
                learnMethod: "level-up",
                version: "red-blue",
                level: 40,
              },
            ],
          },
        },
        name: "dugtrio",
        types: ["ground"],
      },
    ]);
  });
});
