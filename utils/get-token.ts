import { Request } from "express";
import { InvalidTokenError } from "./errors";

export const getToken = (req: Request) => {
  const authorization = req.header("authorization");
  if (!(authorization && authorization.toLowerCase().startsWith("bearer ")))
    throw new InvalidTokenError();

  return authorization.substring(7);
};
