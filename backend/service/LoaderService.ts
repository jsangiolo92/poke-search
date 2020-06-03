import { RedisRepo } from "../repo/RedisRepo";
import { AxiosInstance } from "axios";
import { Logger } from "./Logger";

const damageClass = "damage_class";
const versionGroupDetails = "version_group_details";
const levelLearnAt = "level_learn_at";
const moveLearnMethod = "move_learn_method";
const versionGroup = "version_group";

export class LoaderService {
  private redisRepo: RedisRepo;
  private logger: Logger;
  private moveLimit: number;
  private pokemonLimit: number;
  private axios: AxiosInstance;
  private completeMovesObj: any;

  constructor(redisRepo, logger, moveLimit, pokemonLimit, axios) {
    this.redisRepo = redisRepo;
    this.logger = logger;
    this.moveLimit = moveLimit;
    this.pokemonLimit = pokemonLimit;
    this.axios = axios;
  }

  public buildAndLoadPokemonObj = async () => {
    const data = await this.buildPokemonObject();
    this.redisRepo.loadData("pokemon", data).then(this.logger.log).catch(this.logger.error);
  };

  public buildAndLoadMoveTypesObj = async () => {
    const data = await this.buildMoveTypeObj();
    this.redisRepo.loadData("moveTypes", data).then(this.logger.log).catch(this.logger.error);
  };

  private buildPokemonObject = async () => {
    if (!this.completeMovesObj) {
      this.completeMovesObj = await this.redisRepo.getMoveTypes();
    }

    const dataObj = {};

    for (let i = 1; i < this.pokemonLimit; i++) {
      const url = `http://pokeapi.co/api/v2/pokemon/${i}/`;
      const { data: apiData } = await this.axios.get(url);

      // TODO -> make type
      dataObj[apiData.name] = {
        id: i,
        name: apiData.name,
        types: this.transformTypeData(apiData.types),
        moves: this.transformMovesData(apiData.moves),
      };

      this.logger.log(apiData.name);

      if (i % 90 === 0) {
        await this.sleep(60000);
      }
    }

    return dataObj;
  };

  private buildMoveTypeObj = async () => {
    const dataObj = {};

    for (let i = 1; i < this.moveLimit; i++) {
      const url = `http://pokeapi.co/api/v2/move/${i}/`;
      const { data } = await this.axios.get(url);

      // TODO -> make type
      dataObj[data.name] = {
        id: i,
        name: data.name,
        type: data.type.name,
        damageClass: data[damageClass].name,
      };

      this.logger.log(dataObj[data.name]);

      if (i % 90 === 0) {
        await this.sleep(60000);
      }
    }

    return dataObj;
  };

  private transformTypeData = (types) => {
    return types.map((typeObj) => typeObj.type.name);
  };

  private transformMovesData = (moves) => {
    return moves.reduce((resultObj, moveObj) => {
      const name = moveObj.move.name;
      const versionData = moveObj[versionGroupDetails];
      resultObj[name] = {
        name,
        versionData: this.extractVersionMoveData(versionData),
        type: this.getMoveType(name),
        damageClass: this.getMoveClass(name),
      };
      return resultObj;
    }, {});
  };

  private extractVersionMoveData = (movesArray) => {
    return movesArray.map((move) => {
      return {
        level: move[levelLearnAt],
        learnMethod: move[moveLearnMethod].name,
        version: move[versionGroup].name,
      };
    });
  };

  private getMoveType = (moveName) => {
    return this.completeMovesObj[moveName].type;
  };

  private getMoveClass = (moveName) => {
    return this.completeMovesObj[moveName].damageClass;
  };

  private sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
}
