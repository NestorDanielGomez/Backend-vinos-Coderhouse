import { Router } from "express";
import ProductsRouter from "./products";
import CategoriesRouter from "./categories";
import UsersRouter from "./users";

import CartsRouter from "./carts";

export default class MainRouter {
  constructor() {}

  static start() {
    const router = Router();

    const productsRouter = new ProductsRouter();
    router.use("/products", productsRouter.start());

    const categoriesRouter = new CategoriesRouter();
    router.use("/categories", categoriesRouter.start());

    const usersRouter = new UsersRouter();
    router.use("/users", usersRouter.start());

    const cartsRouter = new CartsRouter();
    router.use("/cart", cartsRouter.start());

    return router;
  }
}
