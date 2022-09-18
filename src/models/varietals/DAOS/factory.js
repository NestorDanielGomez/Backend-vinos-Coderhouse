import Logger from "../../../services/logger";
import VarietalsMongoDAO from "./mongo";

export default class VarietalsFactoryDAO {
  static get(type) {
    switch (type) {
      case "MONGO":
        Logger.info("VARIETALES desde MongoDB | DAO");
        return new VarietalsMongoDAO();

      default:
        Logger.info("VARIETALES desde MongoDB | DAO");
        return new VarietalsMongoDAO();
    }
  }
}
