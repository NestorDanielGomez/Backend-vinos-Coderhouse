import { ApiProduct } from "../api/products";
import Logger from "../services/logger";

export default class ProductsController{
    constructor() {
        this.ApiProducts = ApiProduct
    }
    getProducts = async ( req, res ) => {
        try {
            const { id } = req.params 
            const products = await this.ApiProducts.getProducts(id)
            
            res.status(200).json({
                data: products
            })
        } catch (error) {
            Logger.error('API ERROR occurred when trying to read the products from the DB')
            res.status(400).json({
                msg: 'API ERROR occurred when trying to read the products from the DB',
                error: error
            })
            
        }
    }
    postProducts = async ( req, res) => {
        try {
            const newProduct = req.body
            const productPosted = await this.ApiProducts.postProducts(newProduct)
            
            res.status(201).json({
                msg: 'Product created successfully',
                data: productPosted
            })
        
        } catch (error) {
            Logger.error('API ERROR occurred when trying to create a product in the DB')
            res.status(400).json({
                msg: 'API ERROR occurred when trying to create a product in the DB',
                error: error
            })
        }
    }

    putProducts = async (req, res) => {
        try {
            const { id } = req.params;
            const newData = req.body;
            const updatedProduct = await this.ApiProducts.putProducts(
            id,
            newData
        );
    
        res.status(201).json({
                msg: 'Product updated successfully',
                data: updatedProduct,
            });
        } catch (error) {
            Logger.error('API ERROR occurred when trying to update a product in the DB');
            res.status(400).json({
                msg: 'API ERROR occurred when trying to update a product in the DB',
                error: error
            })
        }
    };
        
    deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;
            await this.ApiProducts.deleteProduct(id);
        
            res.status(200).json({
                msg: 'Product deleted successfully',
            });
        } catch (error) {
            Logger.error('API ERROR occurred when trying to delete a product in the DB');
            res.status(400).json({
                msg: 'API ERROR occurred when trying to delete a product in the DB',
                error: error
            })
        }
    };
}

const ProductController = new ProductsController()

module.exports = {
    ProductController
}