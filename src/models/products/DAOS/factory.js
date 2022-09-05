import Logger from '../../../services/logger'
import ProductsMongoDAO from './mongo'

export default class ProductsFactoryDAO {
    static get(type) {
        switch (type) {
            case 'MONGO':
                Logger.info('||-- Returning MongoDB Products DAOS --||')
                return new ProductsMongoDAO();            
        
            default:
                Logger.info('||-- Returning (By Default) MongoDB Products DAOS --||')
                return new ProductsMongoDAO();
        }
    }
}