import { Request, Response, NextFunction } from "express";
import { appConfig } from "../config/app-config";

const { apiKeyHeader, apiKeyValue } = appConfig;

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "production" && req.get(apiKeyHeader) !== apiKeyValue) {
    throw new Error("You are not authorized to use this endpoint");
  }

  next();
};

export default validateRequest;
