import { ApiVarietal } from "../api/varietals";
import Logger from "../services/logger";

export default class varietalsController {
  constructor() {
    this.ApiVarietals = ApiVarietal;
  }
  getVarietal = async (req, res) => {
    try {
      const { id } = req.params;
      const varietal = await this.ApiVarietals.getVarietal(id);

      res.status(200).json({
        data: varietal,
      });
    } catch (error) {
      Logger.error("Error al intentar acceder a la Varietal | Controller");
      res.status(400).json({
        msg: "Error al intentar acceder a la Varietal | Controller:",
        error: error,
      });
    }
  };
  postVarietal = async (req, res) => {
    try {
      const newvarietal = req.body;
      const varietalCreated = await this.ApiVarietals.postVarietal(newvarietal);

      res.status(201).json({
        msg: "Varietal creada con exito | Controller",
        data: varietalCreated,
      });
    } catch (error) {
      Logger.error("Error al crear la Varietal | Controller");
      res.status(400).json({
        msg: "Error al crear la Varietal | Controller:",
        error: error,
      });
    }
  };
  433218;

  putVarietal = async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const updatedvarietal = await this.ApiVarietals.putVarietal(id, newData);

      res.status(201).json({
        msg: "Varietal actualizada con exito | Controller",
        data: updatedvarietal,
      });
    } catch (error) {
      Logger.error("Error al actualizar la Varietal | Controller");
      res.status(400).json({
        msg: "Error al actualizar la Varietal | Controller:",
        error: error,
      });
    }
  };

  deleteVarietal = async (req, res) => {
    try {
      const { id } = req.params;
      await this.ApiVarietals.deleteVarietal(id);

      res.status(200).json({
        msg: "Varietal borrada con exito | Controller",
      });
    } catch (error) {
      Logger.error("Error al borrar Varietal | Controller");
      res.status(400).json({
        msg: "Error al borrar la Varietal | Controller:",
        error: error,
      });
    }
  };
}

export const VarietalController = new varietalsController();
