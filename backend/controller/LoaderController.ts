import { Request, Response, NextFunction } from "express";
import { LoaderService } from "../service/LoaderService";

export class LoaderController {
  private loaderService: LoaderService;

  constructor(loaderService) {
    this.loaderService = loaderService;
  }

  public loadRedisWithMoveTypes = (req: Request, res: Response, next: NextFunction) => {
    this.loaderService.buildAndLoadMoveTypesObj();
    res.send("Move Type loading process started");
  };

  public loadRedisWithPokemonData = (req: Request, res: Response, next: NextFunction) => {
    this.loaderService.buildAndLoadPokemonObj();
    res.send("Pokemon loading process started");
  };
}
