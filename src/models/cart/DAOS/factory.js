import Logger from '../../../services/logger'
import CartsMongoDAO from './mongo'

export default class CartsFactoryDAO {
    static get(type) {
        switch (type) {
            case 'MONGO':
                Logger.info('||-- Returning MongoDB Carts DAOS --||')
                return new CartsMongoDAO();            
        
            default:
                Logger.info('||-- Returning (By Default) MongoDB Carts DAOS --||')
                return new CartsMongoDAO();
        }
    }
}