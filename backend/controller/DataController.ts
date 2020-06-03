import { Request, Response, NextFunction } from "express";
import { DataService } from "../service/DataService";
import { APIResponse } from "../model/APIResponse";
import { Logger } from "../service/Logger";

export class DataController {
  private dataService: DataService;
  private logger: Logger;

  constructor(dataService, logger) {
    this.dataService = dataService;
    this.logger = logger;
  }

  public getAllPokemonData = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.log("request received to fetch pokemon data");
    try {
      const pokemonData = await this.dataService.fetchPokemonData();
      const response = new APIResponse(null, pokemonData, null);
      res.status(200).send(response);
    } catch (err) {
      this.logger.error(err.message);
      next(err);
    }
  };

  public getMovesData = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.log("request received to fetch moves data");
    try {
      const movesData = await this.dataService.fetchMovesData();
      const response = new APIResponse(null, null, movesData);
      res.status(200).send(response);
    } catch (err) {
      this.logger.error(err.message);
      next(err);
    }
  };
}
