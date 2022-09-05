import ApiBrands from "../api/brands";
import Logger from "../services/logger";

export default class BrandsController {
  constructor() {
    this.ApiBrands = new ApiBrands();
  }
  getbrand = async (req, res) => {
    try {
      const { id } = req.params;
      const brand = await this.ApiBrands.getBrands(id);

      res.status(200).json({
        data: brand,
      });
    } catch (error) {
      Logger.error("Error al intentar acceder a la Marca | Controller");
      res.status(400).json({
        msg: "Error al intentar acceder a la Marca | Controller:",
        error: error,
      });
    }
  };
  postbrand = async (req, res) => {
    try {
      const newbrand = req.body;
      const brandCreated = await this.ApiBrands.postBrand(newbrand);

      res.status(201).json({
        msg: "Marca creada con exito | Controller",
        data: brandCreated,
      });
    } catch (error) {
      Logger.error("Error al crear la Marca | Controller");
      res.status(400).json({
        msg: "Error al crear la Marca | Controller:",
        error: error,
      });
    }
  };
  433218;

  putbrand = async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const updatedbrand = await this.ApiBrands.putBrand(id, newData);

      res.status(201).json({
        msg: "Marca actualizada con exito | Controller",
        data: updatedbrand,
      });
    } catch (error) {
      Logger.error("Error al actualizar la Marca | Controller");
      res.status(400).json({
        msg: "Error al actualizar la Marca | Controller:",
        error: error,
      });
    }
  };

  deletebrand = async (req, res) => {
    try {
      const { id } = req.params;
      await this.ApiBrands.deleteBrand(id);

      res.status(200).json({
        msg: "Marca borrada con exito | Controller",
      });
    } catch (error) {
      Logger.error("Error al borrar la Marca | Controller");
      res.status(400).json({
        msg: "Error al borrar la Marca | Controller:",
        error: error,
      });
    }
  };
}
