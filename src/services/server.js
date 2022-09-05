import express from "express";
import * as http from "http";
import path from "path";
import Logger from "./logger";
import MainRouter from "../routes";
import cors from "cors";

const app = express();

const publicPath = path.resolve(__dirname, "../../../client/build");
app.use(express.static(publicPath));

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionSuccessStatus: 200,
  methods: "GET, POST, PUT, DELETE",
};

app.use(cors(corsOptions));

app.use("/api", MainRouter.start());

app.use((req, res) => {
  res.status(404).json({
    msg: "Path not found",
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
