import { ApiProduct } from "../api/products";
import Logger from "../services/logger";

export default class ProductsController {
  constructor() {
    this.ApiProducts = ApiProduct;
  }
  getProducts = async (req, res) => {
    try {
      const { id } = req.params;
      const products = await this.ApiProducts.getProducts(id);

      res.status(200).json({
        data: products,
      });
    } catch (error) {
      Logger.error("Error al intentar acceder al producto | Controller");
      res.status(400).json({
        msg: "Error al intentar acceder al producto | Controller",
        error: error,
      });
    }
  };
  postProducts = async (req, res) => {
    try {
      const newProduct = req.body;
      const productPosted = await this.ApiProducts.postProducts(newProduct);

      res.status(201).json({
        msg: "Producto creado con exito",
        data: productPosted,
      });
    } catch (error) {
      Logger.error("Error al crear un producto en la db | Controller");
      res.status(400).json({
        msg: "Error al crear un producto en la db | Controller:",
        error: error,
      });
    }
  };

  putProducts = async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const updatedProduct = await this.ApiProducts.putProducts(id, newData);

      res.status(201).json({
        msg: "Producto actualizado con exito",
        data: updatedProduct,
      });
    } catch (error) {
      Logger.error("Error al actualizar un producto en la db | Controller");
      res.status(400).json({
        msg: "Error al actualizar un producto en la db | Controller",
        error: error,
      });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await this.ApiProducts.deleteProduct(id);

      res.status(200).json({
        msg: "Producto borrado con exito",
      });
    } catch (error) {
      Logger.error("Error al borrar un producto en la db | Controller");
      res.status(400).json({
        msg: "Error al borrar un producto en la db | Controller:",
        error: error,
      });
    }
  };
}

export const ProductController = new ProductsController();
