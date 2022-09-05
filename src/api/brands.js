import Logger from "../services/logger";
import Config from "../config";
import BrandsFactoryDAO from "../models/brands/DAOS/factory";
import Brands from "../models/brands";

export default class ApiBrands {
  constructor() {
    this.brandsDAO = BrandsFactoryDAO.get(Config.PERSISTENCE);
  }

  async getBrands(id) {
    Logger.info("Leyendo MARCAS de la DB | API");
    return this.brandsDAO.get(id);
  }

  async postBrand(newData) {
    await Brands.validate(newData, true);
    Logger.info("Creando MARCA en la DB | API");
    return this.brandsDAO.post(newData);
  }

  async putBrand(id, newData) {
    await Brands.validate(newData, false);
    Logger.info("Actualizando MARCA en la DB | API");
    return this.brandsDAO.put(id, newData);
  }

  async deleteBrand(id) {
    Logger.info("Borrando MARCA en la DB | API");
    return this.brandsDAO.delete(id);
  }
}

export const ApiBrand = new ApiBrands();
