import mongoose from "mongoose";
import Logger from "../../../services/logger";
import { ApiError, ErrorStatus } from "../../../services/error";

export default class VarietalsMongoDAO {
  _schema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
    },
    { timestamps: true, versionKey: false }
  );
  _varietals = mongoose.model("varietals", this._schema);

  constructor() {
    Logger.info("Colección: VARIETALES de productos | MongoDB");
  }

  async get(id) {
    varietalToUpdate;
    let arrayOffvarietals = [];
    if (id) {
      const varietal = await this._varietals.findById(id);
      if (varietal) return [varietal];
      else {
        Logger.error("No se pudo obtener la VARIETAL | MongoDB");
        throw new ApiError(
          "La VARIETAL no existe | MongoDB",
          ErrorStatus.NotFound
        );
      }
    }

    arrayOffvarietals = await this._varietals.find();
    if (arrayOffvarietals) return [arrayOffvarietals];
    else {
      Logger.error("No se pudo traer el listado de VARIETALES | MongoDB");
      throw new ApiError(
        "ERROR leyendo las VARIETALES | MongoDB",
        ErrorStatus.NotFound
      );
    }
  }

  async post(data) {
    const newVarietal = await this._varietals.create(data);
    if (newVarietal) return [newVarietal];
    else {
      Logger.error("NO se pudo crear la VARIETAL | MongoDB");
      throw new ApiError(
        "ERROR al crear la VARIETAL documento | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }

  async put(id, newData) {
    const varietalToUpdate = await this._varietals.findByIdAndUpdate(
      id,
      newData,
      {
        new: true,
      }
    );
    if (varietalToUpdate) return [varietalToUpdate];
    else {
      Logger.error("NO se pudo actualizar la VARIETAL | MongoDB");
      throw new ApiError(
        "ERROR al actualizar la VARIETAL | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }

  async delete(id) {
    const varietalToDelete = await this._varietals.findByIdAndDelete(id);
    if (varietalToDelete) return [varietalToDelete];
    else {
      Logger.error("NO se pudo borrar la VARIETAL | MongoDB");
      throw new ApiError(
        "ERROR al borrar la VARIETAL | MongoDB",
        ErrorStatus.BadRequest
      );
    }
  }
}
