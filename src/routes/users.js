import express from 'express';
import { UsersController } from '../controllers/users';


export default class UsersRouter {
	constructor() {
		this.Controller = UsersController;
	}

	start() {
		const router = express.Router();

		router.get('/:id?', this.Controller.getUsers)
		router.get('/:email?', this.Controller.getUserByEmail)
		router.post('/login', this.Controller.loginUser)
		router.post('/signup', this.Controller.signupUser)
		router.put('/:id', this.Controller.putUser)
		router.delete('/:id', this.Controller.deleteUser)

		return router;
	}
}