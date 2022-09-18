import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import * as http from "http";
import Logger from "./logger";
import MainRouter from "../routes";
import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs';

const app = express();


const publicPath = path.resolve(__dirname, "../../public");
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//--------------

//--------------
const swaggerPath = path.resolve(process.cwd(), './swagger.yml');
const swaggerDoc = YAML.load(swaggerPath);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
//--------------
const errorHandler = (err, req, res, next) => {
  Logger.error(err.stack);
  const status = err.statusCode || 500;
  const msg = err.message || "Internal Server Error";
  const stack = err.stack;
  res.status(status).send({ msg, stack });
};

app.use(errorHandler);


//----------
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

//--------------
app.use("/api", MainRouter.start());
app.use((req, res) => {
  res.status(404).json({
    msg: "Ruta no encontrada",
  });
});


//--------------


const HTTPServer = http.createServer(app);



export default HTTPServer;
