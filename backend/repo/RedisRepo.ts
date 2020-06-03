type RedisPromises = {
  addObject: (key: string, obj: any) => {};
  getObject: (key: string) => {};
};

export class RedisRepo {
  private redisPromises: RedisPromises;
  constructor(redisPromises) {
    this.redisPromises = redisPromises;
  }

  public getPokemonData = async () => {
    return await this.redisPromises.getObject("pokemon");
  };

  public getMoveTypes = async () => {
    return await this.redisPromises.getObject("moveTypes");
  };

  public loadData = async (key, data) => {
    return await this.redisPromises.addObject(key, data);
  };
}
