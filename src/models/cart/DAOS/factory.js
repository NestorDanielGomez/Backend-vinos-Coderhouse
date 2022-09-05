import Logger from "../../../services/logger";
import CartsMongoDAO from "./mongo";

export default class CartsFactoryDAO {
  static get(type) {
    switch (type) {
      case "MONGO":
        Logger.info("CARROS desde mongodb | DAO");
        return new CartsMongoDAO();

      default:
        Logger.info("CARROS desde mongodb | DAO");
        return new CartsMongoDAO();
    }
  }
}
