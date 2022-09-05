import mongoose from 'mongoose'
import Logger from '../../../services/logger'
import { ApiError, ErrorStatus } from '../../../services/error'
import CategoriesFactoryDAO from '../../categories/DAOS/factory'

export const productsCollectionName = 'products';

export default class ProductsMongoDAO {

    _schema = new mongoose.Schema(
        {
            name: {type: String, required: true, unique: true},
            price: {type: Number, required: true},
            description: {type: String, required: true},
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: CategoriesFactoryDAO,
                required: true,
            },
            img: { type: String, default: 'http://localhost:5000/api/file/1662162435680-products-upload.png'},
        },
        { timestamps: true, versionKey: false }
    )
    _productos = mongoose.model(productsCollectionName, this._schema)
    
    constructor() {
        Logger.info('--> Running MongoDB Products Collection')
    }

    //MÉTODOS

    //obtener productos
    async get(id) {
        let output = [];
            if(id) {
                const document = await this._productos.findById(id)
                    if (document) return [document]
                    else {
                        Logger.error('--> Error getting document from MongoDB')
                        throw new ApiError('The document does not exist', ErrorStatus.NotFound)
                    }
            }

        output = await this._productos.find()
            if (output) return [output]
            else {
                Logger.error('--> Error getting documents from MongoDB')
                throw new ApiError('Error getting documents from MongoDB', ErrorStatus.NotFound)
            }
    }
    //guardar productos
    async post(data) {
        const newProduct = await this._productos.create(data);
            if (newProduct) return [newProduct]
            else {
                Logger.error('--> Error creating document from MongoDB')
                throw new ApiError('Error creating MongoDB document', ErrorStatus.BadRequest)
            }
    }

    //actualizar productos
    async put(id, newData) {
        const result = await this._productos.findByIdAndUpdate(id, newData, {new: true,});
            if (result) return [result]
            else {
                Logger.error('--> Error updating document from MongoDB')
                throw new ApiError('MongoDB document could not be updated', ErrorStatus.BadRequest)
            }
    }
    
    //borrar productos
    async delete(id) {
        const result =  await this._productos.findByIdAndDelete(id);
            if (result) return [result]
            else {
                Logger.error('--> Error deleting document from MongoDB')
                throw new ApiError('MongoDB document could not be deleted', ErrorStatus.BadRequest)
            }
    }

}

