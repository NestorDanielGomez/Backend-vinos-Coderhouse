import mongoose from "mongoose";
import Logger from "../../../services/logger";
import { ApiError, ErrorStatus } from "../../../services/error";

export default class BrandsMongoDAO {
  _schema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
    },
    { timestamps: true, versionKey: false }
  );
  _brands = mongoose.model("brands", this._schema);

  constructor() {
    Logger.info("Colección: MARCAS de productos | MongoDB");
  }

  async get(id) {
    let arrayOffBrands = [];
    if (id) {
      const brand = await this._brands.findById(id);
      if (brand) return [brand];
      else {
        Logger.error("No se pudo obtener la MARCA | MongoDB");
        throw new ApiError(
          "La MARCA no existe | MongoDB",
          ErrorStatus.NotFound
        );
      }
    }

    arrayOffBrands = await this._brands.find();
    if (arrayOffBrands) return [arrayOffBrands];
    else {
      Logger.error("No se pudo traer el listado de MARCAS | MongoDB");
      throw new ApiError(
        "ERROR leyendo las MARCAS | MongoDB",
        ErrorStatus.NotFound
      );
    }
  }

  async post(data) {
    const newBrand = await this._brands.create(data);
    if (newBrand) return [newBrand];
    else {
      Logger.error("NO se pudo crear la MARCA | MongoDB");
      throw new ApiError(
        "ERROR al crear la MARCA documento | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }

  async put(id, newData) {
    const brandToUpdate = await this._brands.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (brandToUpdate) return [brandToUpdate];
    else {
      Logger.error("NO se pudo actualizar la MARCA | MongoDB");
      throw new ApiError(
        "ERROR al actualizar la MARCA | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }

  async delete(id) {
    const brandToDelete = await this._brands.findByIdAndDelete(id);
    if (brandToDelete) return [brandToDelete];
    else {
      Logger.error("NO se pudo borrar la MARCA | MongoDB");
      throw new ApiError(
        "ERROR al borrar la MARCA | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }
}
