import Logger from "../services/logger";
import Config from "../config";
import CartsFactoryDAO from "../models/cart/DAOS/factory";

export default class ApiCart {
  constructor() {
    this.cartsDAO = CartsFactoryDAO.get(Config.PERSISTENCE);
  }

  async createCart(userId) {
    Logger.info("Creando Carro en la BD | API");
    return this.cartsDAO.createCart(userId);
  }
  async getCartByUser(id) {
    Logger.info("Leyendo Carro de la BD | API");
    return this.cartsDAO.get(id);
  }
  async addProducts(cartId, productId, amount) {
    Logger.info("Agregando productos al Carro en la BD | API");
    return this.cartsDAO.post(cartId, productId, amount);
  }

  async deleteProducts(cartId, productId, amount) {
    Logger.info("Borrando 1 producto del Carro en la BD | API");
    return this.cartsDAO.delete(cartId, productId, amount);
  }

  async emptyCart(cartId) {
    Logger.info("Carro vacio en la BD | API");
    return this.cartsDAO.emptyCart(cartId);
  }

  async deleteCart(cartId) {
    Logger.info("Borrando carro en la DB | API");
    return this.cartsDAO.deleteCart(cartId);
  }
}

const ApiCarts = new ApiCart();

module.exports = {
  ApiCarts,
};
