import { RedisRepo } from "../repo/RedisRepo";
import { DataService } from "../service/DataService";
import { DataController } from "../controller/DataController";
import { LoaderService } from "../service/LoaderService";
import { LoaderController } from "../controller/LoaderController";
import { appConfig } from "./app-config";
import methods from "../redis/redis-functions";
import axios from "axios";
import { Logger } from "../service/Logger";

const logger: Logger = new Logger();

const redisRepo: RedisRepo = new RedisRepo(methods);
const dataService: DataService = new DataService(redisRepo);
const dataController: DataController = new DataController(dataService, logger);

const loaderService: LoaderService = new LoaderService(
  redisRepo,
  logger,
  appConfig.moveLimit,
  appConfig.pokemonLimit,
  axios,
);
const loaderController: LoaderController = new LoaderController(loaderService);

export { dataController, loaderController };
