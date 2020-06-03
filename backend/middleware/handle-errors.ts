import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../model/APIResponse";

const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const response = new APIResponse(err.message, null, null);
  res.status(400).send(response);
};

export default handleErrors;
