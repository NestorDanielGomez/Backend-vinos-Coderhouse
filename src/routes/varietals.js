import express from "express";
import VarieltalsController from "../controllers/categories";

export default class VarietalsRouter {
  constructor() {
    this.Controller = new VarieltalsController();
  }

  start() {
    const router = express.Router();

    router.get("/:id?", this.Controller.getVarietal);
    router.post("/", this.Controller.postVarietal);
    router.put("/:id", this.Controller.putVarietal);
    router.delete("/:id", this.Controller.deleteVarietal);

    return router;
  }
}
