import { ApiUsers, ApiCarts } from "../api";
import Logger from "../services/logger";

export const isAdmin = (req, res, done) => {
  Logger.info("Validacion Usuario ADMIN");

  if (!req.user.admin)
    return res.status(401).json({ msg: "Usuario no autorizado | NO ES ADMIN" });

  done();
};

export const createUser = async (userData) => {
  const newUser = await ApiUsers.postUser(userData);

  await CartAPI.postCart(newUser._id);
  return newUser;
};
