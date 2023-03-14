import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "models";
import { TokenUser } from "types";
import { getToken, InvalidTokenError, JWT_SECRET } from "utils";

export const tokenValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getToken(req);
    const { id: userId } = jwt.verify(token, JWT_SECRET) as TokenUser;

    const user = await User.findById(userId);
    if (!userId || !user) throw new InvalidTokenError();

    req.headers["user-id"] = userId.toString();
    next();
  } catch (err) {
    next(err);
  }
};
