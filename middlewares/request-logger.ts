import { NextFunction, Request, Response } from "express";
import { logger } from "utils";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("Method:", req.method);
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  logger.info("---");
  next();
};
