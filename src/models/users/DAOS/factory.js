import Logger from "../../../services/logger";
import UsersMongoDAO from "./mongo";

export default class UsersFactoryDAO {
  static get(type) {
    switch (type) {
      case "MONGO":
        Logger.info("USUARIOS desde MongoDB | DAO");
        return new UsersMongoDAO();

      default:
        Logger.info("USUARIOS desde MongoDB | DAO");
        return new UsersMongoDAO();
    }
  }
}
