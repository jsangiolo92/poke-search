import { RedisRepo } from "../repo/RedisRepo";
export class DataService {
  private redisRepo: RedisRepo;

  constructor(redisRepo) {
    this.redisRepo = redisRepo;
  }

  public fetchPokemonData = async () => {
    return await this.redisRepo.getPokemonData();
  };

  public fetchMovesData = async () => {
    return await this.redisRepo.getMoveTypes();
  };
}
