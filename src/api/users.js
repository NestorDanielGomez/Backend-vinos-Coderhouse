import Logger from "../services/logger";
import Config from "../config";
import UsersFactoryDAO from "../models/users/DAOS/factory";
import Users from "../models/users";
import { CartController } from "../controllers/carts";
import { ApiCarts } from "./carts";

export default class ApiUsers {
  constructor() {
    this.usersDAO = UsersFactoryDAO.get(Config.PERSISTENCE);
  }

  async getUser(id) {
    Logger.info("Leyendo USUARIOS (ID) de la DB | API");
    return this.usersDAO.get(id);
  }

  async getUserByEmailUser(email) {
    Logger.info("Leyendo USUARIOS (EMAIL) de la DB | API");
    return this.usersDAO.getUserByEmailUser(email);
  }

  async postUser(newData) {
    Logger.info("Creando PRODUCTO en la DB | API");
    await Users.validate(newData, true);
    const newUser = await this.usersDAO.post(newData);

    const userId = newUser._id.toString();

    const cart = await CartController.createCart({ userId });

    const newUserCreated = {
      user: newUser,
      cart: cart,
    };

    return newUserCreated;
  }

  async putUser(id, newData) {
    Logger.info("Actualizando PRODUCTO en la DB | API");
    await Users.validate(newData, false);
    return this.usersDAO.put(id, newData);
  }

  async deleteUser(id) {
    const user = await this.usersDAO.get(id);
    const cart = await ApiCarts.getCartByUser(id);
    const cartId = cart._id.toString();
    Logger.info("Borrando CARRO en la DB | API");
    await ApiCarts.deleteCart(cartId);
    Logger.info("Borrando USUARIO en la DB | API");
    return this.usersDAO.delete(id);
  }
}

export const ApiUser = new ApiUsers();
