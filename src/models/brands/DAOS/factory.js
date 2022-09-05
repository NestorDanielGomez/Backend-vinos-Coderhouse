import Logger from "../../../services/logger";
import BrandsMongoDAO from "./mongo";

export default class BrandsFactoryDAO {
  static get(type) {
    switch (type) {
      case "MONGO":
        Logger.info("MARCAS desde MongoDB | DAO");
        return new BrandsMongoDAO();

      default:
        Logger.info("MARCAS desde MongoDB | DAO");
        return new BrandsMongoDAO();
    }
  }
}
