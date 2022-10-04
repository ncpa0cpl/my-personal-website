import cors from "cors";
import express from "express";
import "reflect-metadata";
import StatusCode from "status-code-enum";
import { setupDefaultHeadersMiddleware } from "./middlewares/default-headers.middleware";
import { setupLanguageSelectionMiddleware } from "./middlewares/language-selection-middleware";
import { Routes } from "./routes";
import { addRoutes } from "./utilities/add-routes";
import { isDev } from "./utilities/is-dev";
import { Log } from "./utilities/log";
import { setupSession } from "./utilities/setup-session";

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    const server = express();

    // #region Middlewares
    server.use(
      cors({
        origin: [isDev() ? "*" : "<put-production-domain-here>"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );
    server.use(express.json());
    setupDefaultHeadersMiddleware(server);
    setupSession(server);
    setupLanguageSelectionMiddleware(server);
    // #endregion

    // #region Routes
    addRoutes(server, Routes);
    server.all("*", (_, req) => {
      req.sendStatus(StatusCode.ClientErrorBadRequest);
    });
    // #endregion

    server.listen(PORT, () => {
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
