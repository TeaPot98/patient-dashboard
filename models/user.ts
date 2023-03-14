import mongoose from "mongoose";

import { formatMongoSchema } from "./utils";

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  username: String,
  role: String,
  passwordHash: String,
});

export const User = mongoose.model("User", formatMongoSchema(userSchema));
