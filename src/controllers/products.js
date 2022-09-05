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
      Logger.error(
        "Ocurrio un error al intentar acceder a los productos desde la db"
      );
      res.status(400).json({
        msg: "Ocurrio un error al intentar acceder a los productos desde la db",
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
      Logger.error("Ocurrio un error al crear un producto en la db");
      res.status(400).json({
        msg: "Ocurrio un error al crear un producto en la db",
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
      Logger.error("Ocurrio un error al intentar actualizar producto en la db");
      res.status(400).json({
        msg: "Ocurrio un error al intentar actualizar producto en la db",
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
      Logger.error("Ocurrio un error al intentar borrar el producto en la db");
      res.status(400).json({
        msg: "Ocurrio un error al intentar borrar el producto en la db",
        error: error,
      });
    }
  };
}

const ProductController = new ProductsController();

module.exports = {
  ProductController,
};
