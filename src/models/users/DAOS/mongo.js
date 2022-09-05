import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import Logger from '../../../services/logger'


export const usersCollectionName = 'users';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {type: String, required: true},
        lastname: {type: String, required: true},
        phone: {type: Number, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        admin: {type: Boolean, default: false}
    },
        { timestamps: true, versionKey: false}
);

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  return compare;
};

export const UserModel = mongoose.model(usersCollectionName, UserSchema);


export default class UsersMongoDAO {

    constructor(){
        Logger.info('--> Running MongoDB Users Collection')
    }

    //MÉTODOS

   
    //obtener usuarios
    async get(id) {
        let output = [];

        if(id) {
            const document = await UserModel.findById(id)
            if (document) return [document]
            else {
                Logger.error('--> Error getting document from MongoDB')
                throw new ApiError('The document does not exist', ErrorStatus.NotFound)
            }
        }
        output = await UserModel.find()
        return output
    }

    async getUserByEmailUser(email) {

        if(email) {
            const document = await UserModel.findOne({ email })
            if (document) return document
            else {
                Logger.error('--> Error getting document from MongoDB')
                throw new ApiError('The document does not exist', ErrorStatus.NotFound)
            }
        }
    }

    //SAVE USERS
    async post(data) {

        const newUser = await UserModel.create(data)
        if (newUser) return newUser
            else {
                Logger.error('--> Error creating MongoDB document')
                throw new ApiError('Error creating MongoDB document', ErrorStatus.BadRequest)
            }
    }

    //UPDATE USERS
    async put(id, newData) {
        const result = await UserModel.findByIdAndUpdate(id, newData, {
            new: true,
            });
        if (result) return result
            else {
                Logger.error('--> Error updating document from MongoDB')
                throw new ApiError('MongoDB document could not be updated', ErrorStatus.BadRequest)
            }
    }
    
    //DELETE USERS
    async delete(id) {
        const result =  await UserModel.findByIdAndDelete(id);

        if (result) return result
            else {
                Logger.error('--> Error deleting document from MongoDB')
                throw new ApiError('MongoDB document could not be deleted', ErrorStatus.BadRequest)
            }
    }
}

