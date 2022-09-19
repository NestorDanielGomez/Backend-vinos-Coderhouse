import { Router } from "express";
import ProductsRouter from "./products";
import CategoriesRouter from "./categories";
import BrandsRouter from "./brands";
import VarietalsRouter from "./varietals";
import UsersRouter from "./users";
import CartsRouter from "./carts";
import OrdersRouter from './orders';

export default class MainRouter {
  constructor() {}

  static start() {
    const router = Router();

    const productsRouter = new ProductsRouter();
    router.use("/products", productsRouter.start());

    const categoriesRouter = new CategoriesRouter();
    router.use("/categories", categoriesRouter.start());

    const brandsRouter = new BrandsRouter();
    router.use("/brands", brandsRouter.start());

    const varietalsRouter = new VarietalsRouter();
    router.use("/varietals", varietalsRouter.start());

    const usersRouter = new UsersRouter();
    router.use("/users", usersRouter.start());

    const cartsRouter = new CartsRouter();
    router.use("/cart", cartsRouter.start());

    const ordersRouter = new OrdersRouter()
    router.use('/order', ordersRouter.start())

    return router;
  }
}
