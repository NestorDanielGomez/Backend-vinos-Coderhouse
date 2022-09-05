import Logger from "../services/logger";
import Config from "../config";
import CategoriesFactoryDAO from "../models/categories/DAOS/factory";
import Categories from "../models/categories";

export default class ApiCategories {
  constructor() {
    this.categoriesDAO = CategoriesFactoryDAO.get(Config.PERSISTENCE);
  }

  async getCategories(id) {
    Logger.info("Leyendo CATEGORIAS de la DB | API");
    return this.categoriesDAO.get(id);
  }

  async postCategory(newData) {
    await Categories.validate(newData, true);
    Logger.info("Creando CATEGORIA en la DB | API");
    return this.categoriesDAO.post(newData);
  }

  async putCategory(id, newData) {
    await Categories.validate(newData, false);
    Logger.info("Actualizando CATEGORIA en la DB | API");
    return this.categoriesDAO.put(id, newData);
  }

  async deleteCategory(id) {
    Logger.info("Borrando CATEGORIA en la DB | API");
    return this.categoriesDAO.delete(id);
  }
}

export const ApiCategory = new ApiCategories();
