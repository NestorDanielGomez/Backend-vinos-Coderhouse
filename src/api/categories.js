import Logger from "../services/logger";
import Config from "../config";
import CategoriesFactoryDAO from "../models/categories/DAOS/factory";
import Categories from "../models/categories";



export default class ApiCategories{
    constructor() {
        this.categoriesDAO = CategoriesFactoryDAO.get(Config.PERSISTENCE)
    }

    //MÉTODOS

    // GET ALL / GET BY ID
    async getCategories(id) {
        Logger.info('Reading CATEGORIES database from DB');
        return this.categoriesDAO.get(id)
    }

    //POST
    async postCategory(newData) {
        await Categories.validate(newData, true)
        Logger.info('Creating a Category in the DB');
        return this.categoriesDAO.post(newData)
    }

    async putCategory(id, newData) {
        await Categories.validate(newData, false);
        Logger.info('Updating a Category in the DB');
        return this.categoriesDAO.put(id, newData);
    }
    
    async deleteCategory(id) {
        Logger.info('Deleting a Category in the DB');
        return this.categoriesDAO.delete(id);
    }
}