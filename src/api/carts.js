import Logger from "../services/logger";
import Config from "../config";
import CartsFactoryDAO from "../models/cart/DAOS/factory";

export default class ApiCart{
    constructor() {
        this.cartsDAO = CartsFactoryDAO.get(Config.PERSISTENCE)
    }

    //MÉTODOS

    async createCart(userId) {
        Logger.info('Creating CART in the DB');
        return this.cartsDAO.createCart(userId)
    }
    async getCartByUser(id) {
        Logger.info('Reading CART database from DB');
        return this.cartsDAO.get(id)
    }
    async addProducts(cartId, productId, amount) { 
        Logger.info('Adding products to the cart in the DB');
        return this.cartsDAO.post(cartId, productId, amount)
    };
    
    async deleteProducts(cartId, productId, amount) {
        Logger.info('Deleting an item in cart in the DB');
        return this.cartsDAO.delete(cartId, productId, amount);
    }

    async emptyCart(cartId) {
        Logger.info('Deleting an item in cart in the DB');
        return this.cartsDAO.emptyCart(cartId);
    }

    async deleteCart(cartId) {
        console.log('CART--API', cartId);
        Logger.info('Deleting a cart in the DB');
        return this.cartsDAO.deleteCart(cartId);
    }
}

const ApiCarts = new ApiCart()

module.exports = {
    ApiCarts
}