import { Pokemon, VersionData } from "./types";
export const filterVersionDataByVersion = (results, version) => {
  results.forEach((pokemonStateObj: Pokemon) => {
    Object.keys(pokemonStateObj.moves).forEach((moveName) => {
      const vData: VersionData[] = pokemonStateObj.moves[moveName].versionData;
      const filteredData = vData.reduce((arr, versionObj: VersionData) => {
        if (versionObj.version === version) {
          arr.push({ ...versionObj });
        }
        return arr;
      }, []);

      pokemonStateObj.moves[moveName].versionData = filteredData;
    });
  });
};

export const filterVersionDataByLearnMethod = (results, learnMethod) => {
  results.forEach((pokemonStateObj: Pokemon) => {
    Object.keys(pokemonStateObj.moves).forEach((moveName) => {
      const vData: VersionData[] = pokemonStateObj.moves[moveName].versionData;
      const filteredData = vData.reduce((arr, versionObj: VersionData) => {
        if (versionObj.learnMethod === learnMethod) {
          arr.push({ ...versionObj });
        }
        return arr;
      }, []);

      pokemonStateObj.moves[moveName].versionData = filteredData;
    });
  });
};
