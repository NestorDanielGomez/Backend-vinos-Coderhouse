import Logger from "../services/logger";
import Config from "../config";
import ProductsFactoryDAO from "../models/products/DAOS/factory";
import Products from "../models/products";

export default class ApiProducts {
  constructor() {
    this.productsDAO = ProductsFactoryDAO.get(Config.PERSISTENCE);
  }
  async getProducts(id) {
    Logger.info("Leyendo PRODUCTOS de la DB | API");
    return this.productsDAO.get(id);
  }

  async postProducts(newData) {
    await Products.validate(newData, true);
    Logger.info("Creando PRODUCTO en la DB | API");
    return this.productsDAO.post(newData);
  }

  async putProducts(id, newData) {
    await Products.validate(newData, false);
    Logger.info("Actualizando PRODUCTO en la DB | API");
    return this.productsDAO.put(id, newData);
  }

  async deleteProduct(id) {
    Logger.info("Borrando PRODUCTO en la DB | API");
    return this.productsDAO.delete(id);
  }
}

export const ApiProduct = new ApiProducts();
