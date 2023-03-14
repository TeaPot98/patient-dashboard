import mongoose from "mongoose";

export interface TokenUser {
  id: mongoose.Schema.Types.ObjectId | string;
  name: string;
  surname: string;
  role: `${Roles}`;
}

export enum Roles {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
}
