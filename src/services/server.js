import express from "express";
import path from "path";
import exphbs from "express-handlebars";

import * as http from "http";

import Logger from "./logger";
import MainRouter from "../routes";

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
  exphbs({
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

const errorHandler = (err, req, res, next) => {
  Logger.error(err.stack);
  const status = err.statusCode || 500;
  const msg = err.message || "Internal Server Error";
  const stack = err.stack;
  res.status(status).send({ msg, stack });
};

app.use(errorHandler);

const HTTPServer = http.createServer(app);

export default HTTPServer;
