import mongoose from "mongoose";
import Logger from "../../../services/logger";
import { ApiError, ErrorStatus } from "../../../services/error";

export default class CategoriesMongoDAO {
  _schema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
    },
    { timestamps: true, versionKey: false }
  );
  _categories = mongoose.model("categories", this._schema);

  constructor() {
    Logger.info("Colección: CATEGORIAS de productos | MongoDB");
  }

  async get(id) {
    let category = [];
    if (id) {
      const category = await this._categories.findById(id);
      if (category) return [category];
      else {
        Logger.error("No se pudo obtener la CATEGORIA | MongoDB");
        throw new ApiError(
          "La CATEGORIA no existe | MongoDB",
          ErrorStatus.NotFound
        );
      }
    }

    category = await this._categories.find();
    if (category) return [category];
    else {
      Logger.error("No se pudo traer el listado de CATEGORIAS | MongoDB");
      throw new ApiError(
        "ERROR leyendo las CATEGORIAS | MongoDB",
        ErrorStatus.NotFound
      );
    }
  }

  async post(data) {
    const newCategory = await this._categories.create(data);
    if (newCategory) return [newCategory];
    else {
      Logger.error("NO se pudo crear la CATEGORIA | MongoDB");
      throw new ApiError(
        "ERROR al crear la CATEGORIA documento | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }

  async put(id, newData) {
    const result = await this._categories.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (result) return [result];
    else {
      Logger.error("NO se pudo actualizar la CATEGORIA | MongoDB");
      throw new ApiError(
        "ERROR al actualizar la CATEGORIA | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }

  async delete(id) {
    const result = await this._categories.findByIdAndDelete(id);
    if (result) return [result];
    else {
      Logger.error("NO se pudo borrar la CATEGORIA | MongoDB");
      throw new ApiError(
        "ERROR al borrar la CATEGORIA | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }
}
