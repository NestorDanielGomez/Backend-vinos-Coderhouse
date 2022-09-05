import Config from "./config";
import Server from "./services/server";
import Logger from "./services/logger";
import MongoDBClient from "./services/mongoDBClient";

let PORT = Config.PORT;
let PERSISTENCE = Config.PERSISTENCE || "MONGO";

const init = async () => {
  if (PERSISTENCE === "MONGO") await MongoDBClient.getConnection();

  const server = Server.listen(PORT, () => {
    Logger.info(`Servidor escuchando en el puerto: ${PORT}`);
  });

  server.on("error", (error) =>
    Logger.error(`Error inicializando el servidor: ${error}`)
  );
};

init();
