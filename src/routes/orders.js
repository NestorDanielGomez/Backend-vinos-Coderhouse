import express from 'express';
import { OrdersController } from '../controllers/orders';


export default class OrdersRouter {
	constructor() {
		this.Controller = OrdersController;
	}

	start() {
		const router = express.Router();

		router.get('/:id?', this.Controller.getOrders)
		router.post('/:userId', this.Controller.createOrder)
		router.put('/:orderId', this.Controller.completeOrder)

		return router;
	}
}