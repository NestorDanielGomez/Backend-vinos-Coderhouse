import mongoose from 'mongoose'
import Logger from '../../../services/logger'
import { ApiError, ErrorStatus } from '../../../services/error'
import { usersCollectionName } from '../../users/DAOS/mongo'


export const ordersCollectionName = 'orders'

const OrderSchema = new mongoose.Schema(
    {
    userId: { type: mongoose.Schema.Types.ObjectId,
            ref: usersCollectionName,
            required: true, },
    products: { type: Array, required: true },
    orderStatus: { type: String, required: true, default: 'generated' },
    orderTotal: { type: Number, required: true }
},
    { timestamps: true, versionKey: false }
  );
export const OrdersModel = mongoose.model(ordersCollectionName, OrderSchema)


export default class OrdersMongoDAO {

    constructor() {
        Logger.info('Coleccion de ordenes desde Mongodb')
    }

   
    async get(id) {
        let output = []

        if(id) {
            const order = await OrdersModel.findOne({ id })
            if (order) return order
            else {
                Logger.error('Error obteniendo orden desde MongoDB')
                throw new ApiError('El documento no existe', ErrorStatus.NotFound)
            }
        }
        output = await OrdersModel.find()
        return output
    }


    async post(userId,cart) {

        let total = 0
        const totalPrice = await cart.products.forEach((product) => {
            total += product.items;
        });

        const generatedOrder = {
            userId:userId,
            products: cart.products,
            orderTotal: total
        }
        const newOrder = await OrdersModel.create(generatedOrder)

        if (newOrder) return newOrder
            else {
                Logger.error('Error creando la orden | Mongodb')
                throw new ApiError('Error creando la orden | Mongodb', ErrorStatus.BadRequest)
            }
    }
    

    async put(orderId, newData) {
        const result =  await OrdersModel.findByIdAndUpdate(orderId, newData, {
            new: true,
            });

        if (result) return result
            else {
                Logger.error('No se pudo actualizar la orden | Mongodb')
                throw new ApiError('No se pudo actualizar la orden | Mongodb', ErrorStatus.BadRequest)
            }
    }
}
