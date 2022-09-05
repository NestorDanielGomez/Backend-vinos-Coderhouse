import { ApiCarts } from "../api/carts";
import Logger from "../services/logger";
import { ApiError, ErrorStatus } from "../services/error";

export default class CartsController {
  constructor() {
    this.ApiCarts = ApiCarts;
  }

  createCart = async (req, res) => {
    try {
      const { userId } = req;

      await this.ApiCarts.createCart(userId);
    } catch (error) {
      Logger.error("Error al crear el carro | Mongodb");
      res.status(400).json({
        msg: "Error creando carro | MongoDB",
        error: error,
      });
    }
  };

  getCart = async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await this.ApiCarts.getCartByUser(id);

      res.status(200).json({
        data: cart,
      });
    } catch (error) {
      Logger.error("No se pudo acceder al carrito");
      res.status(400).json({
        msg: "No se pudo acceder al carrito",
        error: error,
      });
    }
  };

  addProducts = async (req, res) => {
    try {
      const user = req.params;
      const { productId, amount } = req.body;

      if (!productId)
        throw new ApiError("Invalid Body Parameters", ErrorStatus.BadRequest);

      const cart = await this.ApiCarts.getCartByUser(user.id);

      const cartId = cart._id.toString();

      const result = await this.ApiCarts.addProducts(cartId, productId, amount);

      res.status(200).json({
        msg: "Producto agregado con exito",
        cart: result,
      });
    } catch (error) {
      Logger.error("ERROR al tratar de agarrar un producto al carrito");
      res.status(400).json({
        msg: "ERROR al tratar de agarrar un producto al carrito",
        error: error,
      });
    }
  };

  deleteProducts = async (req, res) => {
    try {
      //const { user } = req;
      const user = req.params;
      const { productId, amount } = req.body;
      if (!productId)
        throw new ApiError("Invalid Body Parameters", ErrorStatus.BadRequest);

      const cart = await this.ApiCarts.getCartByUser(user.id);

      const cartId = cart._id.toString();

      const result = await this.ApiCarts.deleteProducts(
        cartId,
        productId,
        amount
      );

      res.status(200).json({
        msg: "Producto eliminado exitosamente del carrito",
        cart: result,
      });
    } catch (error) {
      Logger.error("ERROR no se pudo eliminar el producto del carrito");
      res.status(400).json({
        msg: "ERROR no se pudo eliminar el producto del carrito",
        error: error,
      });
    }
  };

  emptyCart = async (req, res) => {
    try {
      const user = req.params;
      if (!user)
        throw new ApiError(
          "Se necesita un usario para crear un carrito",
          ErrorStatus.BadRequest
        );

      const cart = await this.ApiCarts.getCartByUser(user.id);
      const cartId = cart._id.toString();

      const result = await this.ApiCarts.emptyCart(cartId);

      res.status(200).json({
        msg: "Tu carrito esta vacio",
        cart: result,
      });
    } catch (error) {
      Logger.error("Tu carro esta vacio, no hay productos para eliminar");
      res.status(400).json({
        msg: "Tu carro esta vacio, no hay productos para eliminar",
        error: error,
      });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const user = req.params;
      if (!user)
        throw new ApiError("Se necesita un usario", ErrorStatus.BadRequest);

      const cart = await this.ApiCarts.getCartByUser(user.id);
      const cartId = cart._id.toString();

      const result = await this.ApiCarts.deleteCart(cartId);

      res.status(200).json({
        msg: "Carro Borrado exitosamente",
        cart: result,
      });
    } catch (error) {
      Logger.error("Error al borrar el carro de la db");
      res.status(400).json({
        msg: "Error al borrar el carro de la db",
        error: error,
      });
    }
  };
}

const CartController = new CartsController();

module.exports = {
  CartController,
};
