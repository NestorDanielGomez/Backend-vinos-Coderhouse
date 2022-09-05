import express from 'express';
import { CartController } from '../controllers/carts'

export default class CartsRouter {
	constructor() {
		this.Controller = CartController
	}

	start() {
		const router = express.Router();

		router.get('/:id?', this.Controller.getCart)
		router.post('/:id', this.Controller.addProducts)
		router.delete('/:id', this.Controller.deleteProducts)
		router.delete('/empty/:id', this.Controller.emptyCart)

		return router;
	}
}