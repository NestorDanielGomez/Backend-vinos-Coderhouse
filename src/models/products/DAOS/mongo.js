import mongoose from "mongoose";
import Logger from "../../../services/logger";
import { ApiError, ErrorStatus } from "../../../services/error";
import CategoriesFactoryDAO from "../../categories/DAOS/factory";
import BrandsFactoryDAO from "../../brands/DAOS/factory";
import VarietalsFactoryDAO from "../../varietals/DAOS/factory";

export default class ProductsMongoDAO {
  _schema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },

      description: { type: String, required: true },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CategoriesFactoryDAO,
        required: true,
      },
      brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: BrandsFactoryDAO,
        required: true,
      },
      varietal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: VarietalsFactoryDAO,
        required: true,
      },
      img: { type: String, default: "./images/vino-rosado-trumpeter.jpg" },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    },
    { timestamps: true, versionKey: false }
  );
  _products = mongoose.model("products", this._schema);

  constructor() {
    Logger.info("Colección de productos | MongoDB");
  }

  async get(id) {
    let arrayOffProducts = [];
    if (id) {
      const product = await this._products.findById(id);
      if (product) return [product];
      else {
        Logger.error("No se pudo obtener el producto | MongoDB");
        throw new ApiError("El producto no existe", ErrorStatus.NotFound);
      }
    }

    arrayOffProducts = await this._products.find();
    if (arrayOffProducts) return [arrayOffProducts];
    else {
      Logger.error("No se pudo traer el listado de PRODUCTOS | MongoDB");
      throw new ApiError(
        "ERROR leyendo los PRODUCTOS | MongoDB",
        ErrorStatus.NotFound
      );
    }
  }

  async post(data) {
    const newProduct = await this._products.create(data);
    if (newProduct) return [newProduct];
    else {
      Logger.error("NO se pudo crear el Producto | MongoDB");
      throw new ApiError(
        "ERROR al crear la el PRODUCTO | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }

  async put(id, newData) {
    const productToUpdate = await this._products.findByIdAndUpdate(
      id,
      newData,
      {
        new: true,
      }
    );
    if (productToUpdate) return [productToUpdate];
    else {
      Logger.error("NO se pudo actualizar el producto | MongoDB");
      throw new ApiError(
        "ERROR al actualizar el producto | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }

  async delete(id) {
    const productToDelete = await this._products.findByIdAndDelete(id);
    if (productToDelete) return [productToDelete];
    else {
      Logger.error("NO se pudo borrar el PRODUCTO | MongoDB");
      throw new ApiError(
        "ERROR al borrar el PRODUCTO CATEGORIA | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }
}
