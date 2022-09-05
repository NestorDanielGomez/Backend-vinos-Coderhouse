import Logger from "../services/logger";
import Config from "../config";
import VarietalsFactoryDAO from "../models/brands/DAOS/factory";
import Varietals from "../models/varietals";

export default class ApiVarietals {
  constructor() {
    this.varietalsDAO = VarietalsFactoryDAO.get(Config.PERSISTENCE);
  }

  async getVarietals(id) {
    Logger.info("Leyendo VARIETALS de la DB | API");
    return this.varietalsDAO.get(id);
  }

  async postVarietal(newData) {
    await Brands.validate(newData, true);
    Logger.info("Creando VARIETAL en la DB | API");
    return this.varietalsDAO.post(newData);
  }

  async putVarietal(id, newData) {
    await Brands.validate(newData, false);
    Logger.info("Actualizando VARIETAL en la DB | API");
    return this.varietalsDAO.put(id, newData);
  }

  async deleteVarietal(id) {
    Logger.info("Borrando VARIETAL en la DB | API");
    return this.varietalsDAO.delete(id);
  }
}
