import { Router } from "express";

import { removePasswordHash } from "models/utils";
import { ForbiddenError, getLoggedUser, getUser } from "utils";
import { Roles } from "types";
import { User } from "models";

export const usersRouter = Router();

usersRouter.get("/logged", async (req, res, next) => {
  try {
    const user = await getLoggedUser(req);
    res.json(removePasswordHash(user));
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const { role } = await getLoggedUser(req);
    if (role !== Roles.ADMIN)
      throw new ForbiddenError("Only admins can access the users list");

    const users = await User.find();
    res.json(users.map((u) => removePasswordHash(u)));
  } catch (err) {
    next(err);
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const { role: userRole } = await getLoggedUser(req);
    const userToDeleteId = req.params.id;

    const user = await getUser(userToDeleteId);
    if (!(userRole === Roles.ADMIN || userRole === Roles.MODERATOR) || user.role === Roles.ADMIN)
      throw new ForbiddenError();

    await User.findByIdAndDelete(user.id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
