import Logger from '../../../services/logger'
import UsersMongoDAO from './mongo';

export default class UsersFactoryDAO {
    static get(type) {
        switch (type) {
            case 'MONGO':
                Logger.info('||-- Returning MongoDB Users DAOS --||')
                return new UsersMongoDAO();            
        
            default:
                Logger.info('||-- Returning (By Default) MongoDB Users DAOS --||')
                return new UsersMongoDAO();
        }
    }
}