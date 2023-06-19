import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { logger } from "utils";
import { CustomError } from "utils";
import path from "path";

export const unknownEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.sendFile("index.html", { root: path.resolve("build") }, function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
};

export const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err);
  next(err);
};

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction
) => {
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  } else if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return next(err);
};

export const failSaveHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send(err);
};
