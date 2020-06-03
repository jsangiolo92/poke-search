export const appConfig = {
  port: +process.env.PORT,
  redisHost: process.env.REDIS_HOST,
  redisPort: +process.env.REDIS_PORT,
  redisAuth: process.env.REDIS_AUTH,
  moveLimit: +process.env.MOVE_LIMIT,
  pokemonLimit: +process.env.POKEMON_LIMIT,
  apiKeyHeader: process.env.API_KEY_HEADER,
  apiKeyValue: process.env.API_KEY_VALUE,
};
