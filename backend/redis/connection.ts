import redis, { RedisClient } from "redis";
import { appConfig } from "../config/app-config";
import { Logger } from "../service/Logger";

const { redisHost, redisPort, redisAuth } = appConfig;
const logger = new Logger();

const client: RedisClient = redis.createClient(redisPort, redisHost);

if (process.env.NODE_ENV === "production") {
  client.AUTH(redisAuth);
}

const quit = () => {
  logger.log("closing Redis connection...");
  client.quit();
};

client.on("ready", () => logger.log("Redis ready!"));

client.on("error", (err) => {
  logger.error("REDIS ERROR => " + err);
  quit();
});

process.on("exit", quit);

export default client;
