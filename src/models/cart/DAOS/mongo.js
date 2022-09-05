import mongoose from 'mongoose'
import { ApiProduct } from '../../../api/products'
import Logger from '../../../services/logger'
import { usersCollectionName } from '../../users/DAOS/mongo';
import { ApiError, ErrorStatus } from '../../../services/error';

export const cartCollectionName = 'carts';

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

    
     _carts = mongoose.model(cartCollectionName, this._cartSchema)

    constructor() {
        Logger.info('--> Running MongoDB Carts Collection')
    }

    //MÉTODOS

    //create a cart for an user
    async createCart(userId) {
      const newCart = await this._carts.create({userId})
    }

    //get Cart by user Id
    async get(userId) {

      const cart = this._carts.findOne({userId})
      return cart
    }

    //Add products to the cart
    async post(cartId, productId, amount){

      const product = await ApiProduct.getProducts(productId)

      if (!product)
      throw new ApiError('product does not exists', ErrorStatus.BadRequest);

      
      const cart = await this._carts.findById(cartId)
      if (!cart) throw new ApiError('Cart does not exist', ErrorStatus.BadRequest);

      const index = cart.products.findIndex(
        (aProduct) => aProduct.productId == productId,
      );
      
      if ( index < 0 ) {
        const newProductItem = {
          productId: productId,
          items: amount
        }
        cart.products.push(newProductItem)

      }else cart.products[index].items += amount

      await cart.save()

      return cart
    }
    
    //delete products
    async delete(cartId, productId, amount) {
//Search the product
      const product = await ApiProduct.getProducts(productId);
      if (!product)
        throw new ApiError('Product does not exists', ErrorStatus.BadRequest);
//Search the Cart
      const cart = await this._carts.findById(cartId);
        if (!cart ){
          Logger.error('Cart does not exists')
          if (!cart) throw new ApiError('Cart does not exist', ErrorStatus.BadRequest);
        }
//Serach the Index of the product in the cart
      const index = cart.products.findIndex(
          (aProduct) => aProduct.productId == productId,
      );

      if (index < 0)
        throw new ApiError('Product not found', ErrorStatus.BadRequest);
//Remove elemnt from array cart
      if (!amount || cart.products[index].items <= amount) {
        cart.products.splice(index, 1);

      } else {
        cart.products[index].items -= items;
      }
    
      await cart.save();
    
      return cart;
    }

    //Empty Cart
    async emptyCart(cartId) {
      const cart = await this._carts.findById(cartId);
    
      if (!cart) {
        Logger.error('--> Error emptying cart from MongoDB')
        throw new ApiError('Error emptying cart from MongoDB', ErrorStatus.BadRequest)
      }
    
      cart.products = [];
      await cart.save();
    
      return cart;
    };

    async deleteCart(cartId) {
      const cart = await this._carts.findByIdAndDelete(cartId);
    
      if (!cart) {
        Logger.error('--> Error deleting cart from MongoDB')
        throw new ApiError('Error deleting cart from MongoDB', ErrorStatus.BadRequest)
      }
    
    };
}

