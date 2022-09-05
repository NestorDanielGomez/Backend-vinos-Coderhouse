import { Router } from 'express';
import ProductsRouter from './products';
import CategoriesRouter from './categories';
import UsersRouter from './users';
//import ImagesRouter from './upload';
import CartsRouter from './carts';


export default class MainRouter{
  constructor() {}

  static start() {
    const router = Router()

    //PRODUCTS
    const productsRouter = new ProductsRouter()
    router.use('/products', productsRouter.start())
    
    //CATEGORIES
    const categoriesRouter = new CategoriesRouter()
    router.use('/categories', categoriesRouter.start())
    
    //USERS
    const usersRouter = new UsersRouter()
    router.use('/users', usersRouter.start())

    //IMAGE UPLOAD
    // const imagesRouter = new ImagesRouter()
    // router.use('/file', imagesRouter.start())

    //CARTS
    const cartsRouter = new CartsRouter()
    router.use('/cart', cartsRouter.start())

    return router
  }
}
  