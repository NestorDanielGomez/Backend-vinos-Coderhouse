import { ApiCarts } from "../api/carts";
import { ApiOrders } from "../api/orders";
import Logger from "../services/logger";
import { NotificationEmail } from '../services/sendEmail'


export default class OrderController{
    constructor() {
        this.ApiOrders = ApiOrders;
    }

    getOrders = async ( req, res ) => {
        try {
            const { id } = req.params
            const orders = await this.ApiOrders.getOrder(id)
            
            res.status(200).json({
                data: orders
            })
        } catch (error) {
            Logger.error('Error al leer las ordenes desde la db | Controller')
            res.status(400).json({
                msg: 'Error al leer las ordenes desde la db | Controller',
                error: error.stack
            })
        }
    }

    createOrder = async ( req, res ) => {
        try {
            const { userId } = req.params
            const cart = await ApiCarts.getCartByUser(userId)

            Logger.info('Creando orden...')

            const orderCreated = await this.ApiOrders.createOrder(userId, cart)

            NotificationEmail.notifyByEmail(orderCreated)
        

            res.status(201).json({
                msg: 'Orden creada con exito',
                data: {
                   orderCreated
                }
            })
        
        } catch (error) {
            Logger.error('Error al crear la orden en la db | Controller')
            res.status(400).json({
                msg: 'Error al crear la orden en la db | Controller',
                error: error.stack
            })
        }
    }

    completeOrder = async (req, res) => {
        try {
            const { orderId } = req.params;
            const newData = req.body;
            const updatedOrder = await this.ApiOrders.completeOrder(orderId, newData)
    
            res.status(201).json({
                msg: 'Orden Creada con exito',
                data: updatedOrder,
            });

        } catch (error) {
            Logger.error('Error al actualizar la orden en la db | Controller');
            res.status(400).json({
                msg: 'Error al actualizar la orden en la db | Controller',
                error: error.stack
            })
        }
    };
}        

export const OrdersController = new OrderController()
