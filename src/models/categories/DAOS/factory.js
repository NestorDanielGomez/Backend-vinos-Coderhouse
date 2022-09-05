import Logger from "../../../services/logger";
import CategoriesMongoDAO from "./mongo";

export default class CategoriesFactoryDAO {
  static get(type) {
    switch (type) {
      case "MONGO":
        Logger.info("CATEGORIAS desde MongoDB | DAO");
        return new CategoriesMongoDAO();

      default:
        Logger.info("CATEGORIAS desde MongoDB | DAO");
        return new CategoriesMongoDAO();
    }
  }
}
