import express from "express";
import { ProductController } from "../controllers/products";

export default class ProductsRouter {
  constructor() {
    this.Controller = ProductController;
  }

  start() {
    const router = express.Router();

    router.get("/:id?", this.Controller.getProducts);
    router.post("/", this.Controller.postProducts);
    router.put("/:id", this.Controller.putProducts);
    router.delete("/:id", this.Controller.deleteProduct);

    return router;
  }
}
