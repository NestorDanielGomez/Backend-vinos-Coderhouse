import Joi from "joi";
import { ApiError, ErrorStatus } from "../../services/error";

export default class Brands {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  static validate(brand, requerido) {
    const schema = Joi.object({
      name: requerido ? Joi.string().required() : Joi.string(),
      description: requerido ? Joi.string().required() : Joi.string(),
    });

    const { error } = schema.validate(brand);

    if (error) throw new ApiError("Esquema no valido:", ErrorStatus.BadRequest);
  }
}
