import Joi from "joi";
import { ApiError, ErrorStatus } from "../../services/error";

export default class Products {
  constructor(name, price, description, category, img) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.brand = brand;
    this.varietal = varietal;
    this.price = price;
    this.img = img;
  }

  static validate(product, requerido) {
    const schema = Joi.object({
      name: requerido ? Joi.string().required() : Joi.string(),
      description: requerido ? Joi.string().required() : Joi.string(),
      category: requerido ? Joi.string().required() : Joi.string(),
      brand: requerido ? Joi.string().required() : Joi.string(),
      varietal: requerido ? Joi.string().required() : Joi.string(),
      img: Joi.string(),
      price: requerido ? Joi.number().required() : Joi.number(),
      stock: requerido ? Joi.number().required() : Joi.number(),
    });

    const { error } = schema.validate(product);

    if (error) throw new ApiError("Esquema no valido", ErrorStatus.BadRequest);
  }
}
