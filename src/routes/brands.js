import express from "express";
import { BrandsController } from "../controllers/brands";

export default class BrandsRouter {
  constructor() {
    this.Controller = new BrandsController();
  }

  start() {
    const router = express.Router();

    router.get("/:id?", this.Controller.getBrand);
    router.post("/", this.Controller.postBrand);
    router.put("/:id", this.Controller.putBrand);
    router.delete("/:id", this.Controller.deleteBrand);

    return router;
  }
}
