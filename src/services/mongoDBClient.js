import Config from "../config";
import mongoose from "mongoose";
import Logger from "./logger";

import { ApiError, ErrorStatus } from "./error";

export default class MongoDBClient {
  static MongoDBClient;

  static async getConnection() {
    if (!MongoDBClient.client) {
      try {
        await mongoose.connect(Config.MONGO_ATLAS_SRV);
        Logger.info("Conectando a MongoAtlas");

        MongoDBClient.client = new MongoDBClient();
        Logger.info("CONECTADO a MongoAtlas");
      } catch (err) {
        Logger.error("Error conectando a MongoAtlas:", err);
        throw new ApiError(
          "Error conectando a MongoAtlas",
          ErrorStatus.NotFound
        );
      }
    }
    return MongoDBClient.client;
  }
}

export const disconnectMongoDB = async () => {
  try {
    await mongoose.disconnect();
    Logger.info("Desconectando a MongoAtlas");
  } catch (err) {
    Logger.error("Error desconectando a MongoAtlas:", err);
    throw new ApiError(
      "Error desconectando a MongoAtlas",
      ErrorStatus.NotFound
    );
  }
};
