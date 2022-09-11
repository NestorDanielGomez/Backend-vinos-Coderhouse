import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import * as http from "http";
import Logger from "./logger";
import MainRouter from "../routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

const publicPath = path.resolve(__dirname, "../../public");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));

const layoutDirPath = path.resolve(__dirname, "../../views/layouts");
const defaultLayerPth = path.resolve(__dirname, "../../views/layouts/main.hbs");
const partialDirPath = path.resolve(__dirname, "../../views/partials");

app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    layoutsDir: layoutDirPath,
    extname: "hbs",
    defaultLayout: defaultLayerPth,
    partialsDir: partialDirPath,
  })
);

app.use("/api", MainRouter.start());

app.use((req, res) => {
  res.status(404).json({
    msg: "Ruta no encontrada",
  });
});
//--------------

const swaggerPath = path.resolve(process.cwd(), "./swagger.yml");
const swaggerDoc = YAML.load(swaggerPath);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//--------------
const errorHandler = (err, req, res, next) => {
  Logger.error(err.stack);
  const status = err.statusCode || 500;
  const msg = err.message || "Internal Server Error";
  const stack = err.stack;
  res.status(status).send({ msg, stack });
};

app.use(errorHandler);

const HTTPServer = http.createServer(app);

//---------------------
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Proyecto Final Nestor Gomez",
      version: "0.0.1",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Nestor Gomez",
        url: "https://logrocket.com",
        email: "nestordanielgomez@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Servidor de desarrollo server",
      },
    ],
  },
  apis: ["src/routes/*"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default HTTPServer;
