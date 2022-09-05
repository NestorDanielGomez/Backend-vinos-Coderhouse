import express from "express";
import { CategoriesController } from "../controllers/categories";

export default class CategoriesRouter {
  constructor() {
    this.Controller = new CategoriesController();
  }

  start() {
    const router = express.Router();

    router.get("/:id?", this.Controller.getCategory);
    router.post("/", this.Controller.postCategory);
    router.put("/:id", this.Controller.putCategory);
    router.delete("/:id", this.Controller.deleteCategory);

    return router;
  }
}
