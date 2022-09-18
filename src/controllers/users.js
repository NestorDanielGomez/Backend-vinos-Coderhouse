import Config from "../config";
import { ApiUser } from "../api/users";
import Logger from "../services/logger";
import { generateAuthToken, checkAuth } from "../services/auth";
import { ApiCarts } from '../api/carts'
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.ApiUsers = ApiUser;
  }

  getUsers = async (req, res) => {
    try {
      const { id } = req.params;
      const users = await this.ApiUsers.getUser(id);
      res.status(200).json({
        data: users,
      });

    } catch (error) {
      Logger.error("Error al intentar acceder al usuario | Controller");
      res.status(400).json({
        msg: "Error al intentar acceder al usuario | Controller:",
        error: error.stack,
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
        error: error.stack,
      });
    }
  };

  signupUser = async (req, res) => {
    try {
      const newUser = req.body;
      Logger.info("Creando nuevo usuario");
      const userCreated = await this.ApiUsers.postUser(newUser);
      const userId = (userCreated._id).toString()
      await ApiCarts.createCart(userId)

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
        error: error.stack,
      });
    }
  };

  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      Logger.info("Buscando usuario...");
    
      const user = await this.ApiUsers.getUserByEmailUser(email);
  
      if (!user || !user.isValidPassword(password))
        return res.status(401).json({ msg: "Usuario o Contraseña incorrectos" });
  
      const token = generateAuthToken(user);
  
      res.header("x-auth-token", token).json({
        msg: "LOGIN OK",
        token,
      });
    } catch (error) {
      Logger.error('Error buscando al ususario en la db | Controller')
      res.status(400).json({
          msg: 'Error buscando al ususario en la db | Controller',
          error: error.stack
      })
    }

  };

  getJwtUser = async ( req, res ) => {

    const { token } = req.body
    if (!token) return res.status(401).json({ msg: 'NO autorizado' });

    try {
        const decode = jwt.verify( token, Config.TOKEN_SECRET_KEY);
        const user = await this.ApiUsers.getUser(decode.userId);
    
        if (!user) return res.status(400).json({ msg: 'NO autorizado' });
    
        res.status(200).json({
            user
        })
  
      } catch (error) {
        return res.status(401).json({ msg: 'NO autorizado' ,
      error: error.stack});
      }
}




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
        error: error.stack,
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
        error: error.message,
      });
    }
  };
}

export const UsersController = new UserController();
