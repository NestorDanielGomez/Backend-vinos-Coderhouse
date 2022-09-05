import Config from "../config";
import jwt from "jsonwebtoken";
import { UsersController } from "../controllers/users";

export const generateAuthToken = (user) => {
  const payload = {
    userId: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    admin: user.admin,
  };

  const token = jwt.sign(payload, Config.TOKEN_SECRET_KEY, { expiresIn: "1h" });
  return token;
};

export const checkAuth = async (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) return res.status(401).json({ msg: "NO AUTORIZADO" });

  try {
    const decode = jwt.verify(token, Config.TOKEN_SECRET_KEY);

    const user = await UsersController.getUsers(decode.userId);

    if (!user) return res.status(400).json({ msg: "NO AUTORIZADO" });

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "NO AUTORIZADO" });
  }
};
