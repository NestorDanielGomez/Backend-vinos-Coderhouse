import ApiUsers from "../api/users";
import Logger from "../services/logger";
import { generateAuthToken, checkAuth } from '../services/auth'
import { UserModel } from "../models/users/DAOS/mongo";

export default class UserController{
    constructor() {
        this.ApiUsers = new ApiUsers();
    }

    getUsers = async ( req, res ) => {
        try {
            const { id } = req.params
            const users = await this.ApiUsers.getUser(id)
            
            res.status(200).json({
                data: users
            })
        } catch (error) {
            Logger.error('API ERROR occurred when trying to read the users from the DB')
            res.status(400).json({
                msg: 'API ERROR occurred when trying to read the users from the DB',
                error: error
            })
        }
    }

    getUserByEmail = async ( req, res ) =>{
        try { 
            const { email } = req.params
            const user = ApiUsers.getUserByEmail(email)

            res.status(200).json({
                data: user
            })
            
        } catch (error) {
            Logger.error('API ERROR occurred when trying to read the users from the DB')
            res.status(400).json({
                msg: 'API ERROR occurred when trying to read the users from the DB',
                error: error
            })
        }
    }


    signupUser = async ( req, res ) => {
        try {
            const newUser= req.body
            Logger.info('Creating User...')
            const userCreated = await this.ApiUsers.postUser(newUser)
        

            res.status(201).json({
                msg: 'User created successfully',
                data: {
                   userCreated
                }
            })
        
        } catch (error) {
            Logger.error('API ERROR occurred when trying to create a user in the DB')
            res.status(400).json({
                msg: 'API ERROR occurred when trying to create a user in the DB',
                error: error
            })
        }
    }

    //Login 
    loginUser = async ( req, res ) => {
        const {email, password} = req.body
        Logger.info('Looking for user...')

        const user = await this.ApiUsers.getUserByEmailUser(email)
       
        if (!user || !user.isValidPassword(password))
            return res.status(401).json({ msg: 'Invalid Username/Password' });
        
        const token = generateAuthToken(user)
        
        res.header('x-auth-token', token).json({
            msg: 'login OK',
            token,
        });
    }

    putUser = async (req, res) => {
        try {
            const { id } = req.params;
            const newData = req.body;
            const updatedUser = await this.ApiUsers.putUser(id, newData);
    
            res.status(201).json({
                msg: 'User updated successfully',
                data: updatedUser,
            });

        } catch (error) {
            Logger.error('API ERROR occurred when trying to update a user in the DB');
            res.status(400).json({
                msg: 'API ERROR occurred when trying to update a user in the DB',
                error: error
            })
        }
    };
        
    deleteUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.ApiUsers.deleteUser(id);
        
            res.status(200).json({
                msg: 'User deleted successfully',
            });
        } catch (error) {
            Logger.error('API ERROR occurred when trying to delete a user in the DB');
            res.status(400).json({
                msg: 'API ERROR occurred when trying to delete a user in the DB',
                error: error
            })
        }
    };
}

const UsersController = new UserController()

module.exports = {
    UsersController
}