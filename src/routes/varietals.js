import express from "express";
import { VarietalController } from "../controllers/varietal";

export default class VarietalsRouter {
  constructor() {
    this.Controller = VarietalController;
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
