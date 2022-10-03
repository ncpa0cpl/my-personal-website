import path from "path";
import winston from "winston";
import { isDev } from "./is-dev";

export const Log = winston.createLogger({
  level: "debug",
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.simple()
  ),
  transports: [
    isDev()
      ? new winston.transports.Console()
      : new winston.transports.File({
          dirname: path.resolve(__dirname, "../.."),
          filename: "server.log",
        }),
  ],
});
