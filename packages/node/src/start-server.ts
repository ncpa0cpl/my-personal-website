import express from "express";
import "reflect-metadata";
import StatusCode from "status-code-enum";
import { Routes } from "./routes";
import { addRoutes } from "./utilities/add-routes";
import { Log } from "./utilities/log";

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    const serverApp = express();
    serverApp.use(express.json());

    addRoutes(serverApp, Routes);

    serverApp.all("*", (_, req) => {
      req.sendStatus(StatusCode.ClientErrorBadRequest);
    });

    serverApp.listen(PORT, () => {
      Log.info("Server started");
      console.log(
        `Server started, listening on port ${PORT}\n> http://localhost:${PORT}`
      );
    });
  } catch (e) {
    Log.error("Server failed with an error:", e);
    process.exit(-1);
  }
};

void start();
