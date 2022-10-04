import type { Express } from "express";
import type { SessionOptions } from "express-session";
import session from "express-session";
import path from "path";
import createFileStore from "session-file-store";
import { isDev } from "./is-dev";

const FileStore = createFileStore(session);

export const setupSession = (server: Express) => {
  const options: SessionOptions = {
    secret: "temporary-secret",
    rolling: true,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: path.resolve(__dirname, "../../sessions") }),
    name: "app.session.id",
    cookie: {
      sameSite: true,
      secure: !isDev(),
      httpOnly: true,
    },
  };

  server.use(session(options));
};
