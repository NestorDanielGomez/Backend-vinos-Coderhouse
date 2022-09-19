import Logger from "../services/logger";
import Config from "../config";
import OrdersFactoryDAO from "../models/orders/DAOS/factory";

export default class ApiOrder{
    constructor() {
        this.ordersDAO = OrdersFactoryDAO.get(Config.PERSISTENCE)
    }

     async createOrder(userId, cart) {
        Logger.info('Creando orden en la db | API');
        return this.ordersDAO.post(userId,cart)

    }

    async getOrder(id) {
        Logger.info('Leyendo orden en la db | API');
        return this.ordersDAO.get(id)
    }
   
    async completeOrder(orderId, newData) { 
        Logger.info('Actualizando orden en la db | API');
        return this.ordersDAO.put(orderId, newData)

    };
    
}

export const ApiOrders = new ApiOrder()

