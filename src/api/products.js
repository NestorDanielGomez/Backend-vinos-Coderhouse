import Logger from "../services/logger";
import Config from "../config";
import ProductsFactoryDAO from "../models/products/DAOS/factory";
import Products from '../models/products'

export default class ApiProducts{
    constructor() {
        this.productsDAO = ProductsFactoryDAO.get(Config.PERSISTENCE)
    }

    //MÉTODOS

    // GET ALL / GET BY ID
    async getProducts(id) {
        Logger.info('Reading PRODUCTS database from DB');
        return this.productsDAO.get(id)
    }

    //POST
    async postProducts(newData) {
        await Products.validate(newData, true)
        Logger.info('Creating a product in the DB');
        return this.productsDAO.post(newData)
    }

    async putProducts(id, newData) {
        await Products.validate(newData, false);
        Logger.info('Updating a product in the DB');
        return this.productsDAO.put(id, newData);
    }
    
    async deleteProduct(id) {
        Logger.info('Deleting a product in the DB');
        return this.productsDAO.delete(id);
    }
}

const ApiProduct = new ApiProducts()

module.exports = {
    ApiProduct
}