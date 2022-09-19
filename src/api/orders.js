import Logger from "../services/logger";
import Config from "../config";
import OrdersFactoryDAO from "../models/orders/DAOS/factory";

export default class ApiOrder{
    constructor() {
        this.ordersDAO = OrdersFactoryDAO.get(Config.PERSISTENCE)
    }

     async createOrder(userId, cart) {
        Logger.info('Creating ORDER in the DB');
        return this.ordersDAO.post(userId,cart)

    }

    async getOrder(id) {
        Logger.info('Reading ORDER database from DB');
        return this.ordersDAO.get(id)
    }
   
    async completeOrder(orderId, newData) { 
        Logger.info('Updating status of a order in the DB');
        return this.ordersDAO.put(orderId, newData)

    };
    
}

export const ApiOrders = new ApiOrder()

