import { ApiUser } from "../api/users";
import Logger from "../services/logger";
import { generateAuthToken, checkAuth } from "../services/auth";

export default class UserController {
  constructor() {
    this.ApiUsers = ApiUser;
  }

  getUsers = async (req, res) => {
    try {
      const { id } = req.params;
      const users = await this.ApiUsers.getUser(id);
      console.log(users);
      res.status(200).json({
        data: users,
      });
      res.render("login");
    } catch (error) {
      Logger.error("Error al intentar acceder al usuario | Controller");
      res.status(400).json({
        msg: "Error al intentar acceder al usuario | Controller:",
        error: error,
      });
    }
  };

  getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const user = ApiUsers.getUserByEmail(email);

      res.status(200).json({
        data: user,
      });
    } catch (error) {
      Logger.error("Error al intentar leer el usuario | Controller");
      res.status(400).json({
        msg: "Error al intentar leer el usuario | Controller:",
        error: error,
      });
    }
  };

  signupUser = async (req, res) => {
    try {
      const newUser = req.body;
      Logger.info("Creating User...");
      const userCreated = await this.ApiUsers.postUser(newUser);

      res.status(201).json({
        msg: "Usuario creado con exito",
        data: {
          userCreated,
        },
      });
    } catch (error) {
      Logger.error("Error al intentar crear el usuario | Controller");
      res.status(400).json({
        msg: "Error al intentar crear el usuario | Controller",
        error: error,
      });
    }
  };

  loginUser = async (req, res) => {
    const { email, password } = req.body;
    Logger.info("Buscando usuario...");
    res.render("login");
    const user = await this.ApiUsers.getUserByEmailUser(email);

    if (!user || !user.isValidPassword(password))
      return res.status(401).json({ msg: "Usuario o Contraseña incorrectos" });

    const token = generateAuthToken(user);

    res.header("x-auth-token", token).json({
      msg: "LOGIN OK",
      token,
    });
  };

  putUser = async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const updatedUser = await this.ApiUsers.putUser(id, newData);

      res.status(201).json({
        msg: "Usuario actualizado con exito",
        data: updatedUser,
      });
    } catch (error) {
      Logger.error("Error al intentar actualizar el usuario | Controller");
      res.status(400).json({
        msg: "Error al intentar actualizar el usuario | Controller:",
        error: error,
      });
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.ApiUsers.deleteUser(id);

      res.status(200).json({
        msg: "Usuario borrado con exito",
      });
    } catch (error) {
      Logger.error("Error al intentar borrar el usuario | Controller");
      res.status(400).json({
        msg: "Error al intentar borrar el usuario | Controller",
        error: error,
      });
    }
  };
}

export const UsersController = new UserController();
