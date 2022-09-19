

import Logger from '../../../services/logger'
import OrdersMongoDAO from './mongo'

export default class OrdersFactoryDAO {
    static get(type) {
        switch (type) {
            case 'MONGO':
                Logger.info('ORDENES desde MongoDB | DAO')
                return new OrdersMongoDAO();            
        
            default:
                Logger.info('MARCAS desde MongoDB | DAO')
                return new OrdersMongoDAO();
        }
    }
}