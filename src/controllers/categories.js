import { ApiCategory } from "../api/categories";
import Logger from "../services/logger";

export default class CategoriesController {
  constructor() {
    this.ApiCategories = ApiCategory;
  }
  getCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await this.ApiCategories.getCategories(id);

      res.status(200).json({
        data: category,
      });
    } catch (error) {
      Logger.error("Error al intentar acceder a la categoria | Controller");
      res.status(400).json({
        msg: "Error al intentar acceder a la categoria | Controller:",
        error: error,
      });
    }
  };
  postCategory = async (req, res) => {
    try {
      const newCategory = req.body;
      const CategoryCreated = await this.ApiCategories.postCategory(
        newCategory
      );

      res.status(201).json({
        msg: "CATEGORIA creada con exito | Controller",
        data: CategoryCreated,
      });
    } catch (error) {
      Logger.error("Error al crear la CATEGORIA | Controller");
      res.status(400).json({
        msg: "Error al crear la CATEGORIA | Controller:",
        error: error,
      });
    }
  };
  433218;

  putCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const updatedCategory = await this.ApiCategories.putCategory(id, newData);

      res.status(201).json({
        msg: "CATEGORIA actualizada con exito | Controller",
        data: updatedCategory,
      });
    } catch (error) {
      Logger.error("Error al actualizar la CATEGORIA | Controller");
      res.status(400).json({
        msg: "Error al actualizar la CATEGORIA | Controller:",
        error: error,
      });
    }
  };

  deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      await this.ApiCategories.deleteCategory(id);

      res.status(200).json({
        msg: "CATEGORIA borrada con exito | Controller",
      });
    } catch (error) {
      Logger.error("Error al borrar la CATEGORIA | Controller");
      res.status(400).json({
        msg: "Error al borrar la CATEGORIA | Controller:",
        error: error,
      });
    }
  };
}

export const CategorieController = new CategoriesController();
