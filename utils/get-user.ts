import { User } from "models";
import { NotFoundError } from "utils";

export const getUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new NotFoundError('User not found');
  return user;
};