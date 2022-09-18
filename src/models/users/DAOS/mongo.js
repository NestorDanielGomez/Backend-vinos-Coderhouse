import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Logger from "../../../services/logger";
import { ApiError, ErrorStatus } from '../../../services/error'

export const usersCollectionName = "users";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

export const UserModel = mongoose.model(usersCollectionName, UserSchema);

export default class UsersMongoDAO {
  constructor() {
    Logger.info("USUARIOS desde MongoDB | DAO");
  }

  async get(id) {
    let output = [];

    if (id) {
      const document = await UserModel.findById(id);
      if (document) return document;
      else {
        Logger.error("Error al intentar acceder al usuario | DAO");
        throw new ApiError(
          "Error al intentar acceder al usuario | DAO",
          ErrorStatus.NotFound
        );
      }
    }
    output = await UserModel.find();
    return output;
  }

  async getUserByEmailUser(email) {
    if (email) {
      const document = await UserModel.findOne({ email });
      if (document) return document;
      else {
        Logger.error("Error al intentar leer el usuario | DAO");
        throw new ApiError(
          "Error al intentar leer el usuario | DAO:",
          ErrorStatus.NotFound
        );
      }
    }
  }

  async post(data) {
    const user = {
      name: data.name,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
      password: data.password,
      admin: data.admin
        }    

    const newUser = await UserModel.create(user);
    if (newUser) return newUser;
    else {
      Logger.error("Error al intentar crear el usuario | DAO");
      throw new ApiError(
        "Error al intentar crear el usuario | DAO:",
        ErrorStatus.BadRequest
      );
    }
  }

  async put(id, newData) {
    const result = await UserModel.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (result) return result;
    else {
      Logger.error("Error al intentar crear el usuario | DAO");
      throw new ApiError(
        "Error al intentar crear el usuario | DAO:",
        ErrorStatus.BadRequest
      );
    }
  }

  async delete(id) {
    const result = await UserModel.findByIdAndDelete(id);

    if (result) return result;
    else {
      Logger.error("Error al intentar borrar el usuario | DAO");
      throw new ApiError(
        "Error al intentar borrar el usuario | DAO:",
        ErrorStatus.BadRequest
      );
    }
  }
}
