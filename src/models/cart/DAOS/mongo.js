import mongoose from "mongoose";
import { ApiProduct } from "../../../api/products";
import Logger from "../../../services/logger";
import { usersCollectionName } from "../../users/DAOS/mongo";
import { ApiError, ErrorStatus } from "../../../services/error";

export const cartCollectionName = "carts";

export default class CartsMongoDAO {
  _cartSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId,
                ref: usersCollectionName,
                required: true, },
      products: { type: Array, required: false, default: [] },
    },
    { timestamps: true, versionKey: false }
  );

  _carts = mongoose.model(cartCollectionName, this._cartSchema);

  constructor() {
    Logger.info("Carros desde MongoDb | DAO");
  }

  async createCart(userId) {
    const newCart = {
      userId,
      products: []
    }
    await this._carts.create(newCart);
  }

  async get(userId) {
    const cart = this._carts.findOne({ userId });
    return cart;
  }

  async post(cartId, productId, amount) {
    const product = await ApiProduct.getProducts(productId);

    if (!product)
      throw new ApiError(
        "El producto a agregar no existe | DAO:",
        ErrorStatus.BadRequest
      );

    const cart = await this._carts.findById(cartId);
    if (!cart)
      throw new ApiError("El Carro no existe | DAO:", ErrorStatus.BadRequest);

    const index = cart.products.findIndex(
      (aProduct) => aProduct.productId == productId
    );

    if (index < 0) {
      const newProductItem = {
        productId: productId,
        items: amount,
      };
      cart.products.push(newProductItem);
    } else cart.products[index].items += amount;

    await cart.save();

    return cart;
  }

  async delete(cartId, productId, amount) {
    const product = await ApiProduct.getProducts(productId);
    if (!product)
      throw new ApiError("Producto no existe | DAO", ErrorStatus.BadRequest);

    const cart = await this._carts.findById(cartId);
    if (!cart) {
      Logger.error("Carro no existe | DAO");
      if (!cart)
        throw new ApiError("Carro no existe | DAO:", ErrorStatus.BadRequest);
    }

    const index = cart.products.findIndex(
      (aProduct) => aProduct.productId == productId
    );

    if (index < 0)
      throw new ApiError("Producto no econtrado | DAO", ErrorStatus.BadRequest);

    if (!amount || cart.products[index].items <= amount) {
      cart.products.splice(index, 1);
    } else {
      cart.products[index].items -= items;
    }

    await cart.save();

    return cart;
  }

  async emptyCart(cartId) {
    const cart = await this._carts.findById(cartId);

    if (!cart) {
      Logger.error("Error Vaciando carro desde mongoDB | DAO");
      throw new ApiError(
        "Error Vaciando carro desde mongoDB | DAO:",
        ErrorStatus.BadRequest
      );
    }

    cart.products = [];
    await cart.save();

    return cart;
  }

  async deleteCart(cartId) {
    const cart = await this._carts.findByIdAndDelete(cartId);

    if (!cart) {
      Logger.error("Error Borrando carro desde mongoDB | DAO");
      throw new ApiError(
        "Error Borrando carro desde mongoDB | DAO:",
        ErrorStatus.BadRequest
      );
    }
  }
}
