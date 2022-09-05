import { ApiCarts } from "../api/carts";
import Logger from "../services/logger";
import { ApiError, ErrorStatus } from '../services/error'

export default class CartsController{
    constructor() {
        this.ApiCarts = ApiCarts;
    }

    createCart = async ( req, res ) => {
        try {
            const { userId } = req;
            
            await this.ApiCarts.createCart(userId)
            
        } catch (error) {
            Logger.error('Error creating cart')
            res.status(400).json({
                msg: 'Error creating cart',
                error: error
            })
            
        }
    }

    getCart = async ( req, res ) => {
        try {
            const { id } = req.params
            const cart = await this.ApiCarts.getCartByUser(id)
            
            res.status(200).json({
                data: cart
            })
        } catch (error) {
            Logger.error('Error getting cart')
            res.status(400).json({
                msg: 'Error getting cart',
                error: error
            })
            
        }
    }

    addProducts = async (req, res) => {
        try {
            //const { user } = req;
            const  user  = req.params
            const { productId, amount } = req.body

            if (!productId) throw new ApiError('Invalid Body Parameters', ErrorStatus.BadRequest);
           
           const cart = await this.ApiCarts.getCartByUser(user.id)

           const cartId = (cart._id).toString()

           const result = await this.ApiCarts.addProducts(cartId, productId, amount)
        
            res.status(200).json({
                msg: 'Product added successfully',
                cart: result
            });
        } catch (error) {
            Logger.error('API ERROR occurred when trying to add the product to the Cart')
            res.status(400).json({
                msg: 'API ERROR occurred when trying to add the product to the Cart',
                error: error
            })
        }
    };

        
    deleteProducts = async (req, res) => {
        try {
            //const { user } = req;
            const  user = req.params
            const { productId, amount} = req.body
            if (!productId) throw new ApiError('Invalid Body Parameters', ErrorStatus.BadRequest);

           const cart = await this.ApiCarts.getCartByUser(user.id)
           
           const cartId = (cart._id).toString()

           const result = await this.ApiCarts.deleteProducts(cartId, productId, amount)
        
            res.status(200).json({
                msg: 'Product delected successfully',
                cart: result
            });
        } catch (error) {
            Logger.error('API ERROR occurred when trying to delete the product from the Cart')
            res.status(400).json({
                msg: 'API ERROR occurred when trying to delete the product from the Cart',
                error: error
            })
        }
    };

    emptyCart = async (req, res) => {
        try {
            //const { user } = req;
            const  user = req.params
            if (!user) throw new ApiError('You must provide an user', ErrorStatus.BadRequest);
           
           const cart = await this.ApiCarts.getCartByUser(user.id)
           const cartId = (cart._id).toString()

           const result = await this.ApiCarts.emptyCart(cartId)
        
            res.status(200).json({
                msg: 'Cart is Empty',
                cart: result
            });
        } catch (error) {
            Logger.error('API ERROR occurred when trying to delete the products from the Cart')
            res.status(400).json({
                msg: 'API ERROR occurred when trying to delete the products from the Cart',
                error: error
            })
        }
    };

    deleteCart = async (req, res) => {
        try {
            //const { user } = req;
            const  user = req.params
            if (!user) throw new ApiError('You must provide an user', ErrorStatus.BadRequest);
           
           const cart = await this.ApiCarts.getCartByUser(user.id)
           const cartId = (cart._id).toString()

           const result = await this.ApiCarts.deleteCart(cartId)
        
            res.status(200).json({
                msg: 'Cart deleted Successfully',
                cart: result
            });
        } catch (error) {
            Logger.error('API ERROR occurred when trying to delete the cart from the DB')
            res.status(400).json({
                msg: 'API ERROR occurred when trying to delete the cart from DB',
                error: error
            })
        }
    };
}

const CartController = new CartsController()

module.exports = {
    CartController
}