import Logger from "../services/logger";
import Config from "../config";
import UsersFactoryDAO from "../models/users/DAOS/factory";
import Users from '../models/users'
import { CartController } from '../controllers/carts'
import {ApiCarts} from "./carts";

export default class ApiUsers{
    constructor() {
        this.usersDAO = UsersFactoryDAO.get(Config.PERSISTENCE)
        
    }

    //MÉTODOS

    async getUser(id) {
        Logger.info('Reading USERS database from DB');
        return this.usersDAO.get(id)
    }

    async getUserByEmailUser(email) {
        Logger.info('Reading USERS database from DB');
        return this.usersDAO.getUserByEmailUser(email)
    }

    async postUser(newData) {
        Logger.info('Creating a user in the DB');
        await Users.validate(newData, true)
        const newUser = await this.usersDAO.post(newData)

        const userId = (newUser._id).toString()

        const cart = await CartController.createCart({userId})

        const newUserCreated = {
            user: newUser,
            cart: cart
        }

        return newUserCreated
    }

    async putUser(id, newData) {
        Logger.info('Updating a user in the DB');
        await Users.validate(newData, false);
        return this.usersDAO.put(id, newData);
    }
    
    async deleteUser(id) {
        const user = await this.usersDAO.get(id)
        const cart = await ApiCarts.getCartByUser(id)
        const cartId = (cart._id).toString()
        Logger.info('Deleting a cart in the DB...');
        await ApiCarts.deleteCart(cartId)
        Logger.info('Deleting a user in the DB...');
        return this.usersDAO.delete(id);
    }
}