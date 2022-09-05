import Logger from "../../../services/logger";
import ProductsMongoDAO from "./mongo";

export default class ProductsFactoryDAO {
  static get(type) {
    switch (type) {
      case "MONGO":
        Logger.info("PRODUCTOS desde MongoDB | DAO");
        return new ProductsMongoDAO();

      default:
        Logger.info("PRODUCTOS desde MongoDB | DAO");
        return new ProductsMongoDAO();
    }
  }
}
