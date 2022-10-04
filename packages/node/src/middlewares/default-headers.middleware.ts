import { type Express } from "express";
import { isDev } from "../utilities/is-dev";

export const setupDefaultHeadersMiddleware = (server: Express) => {
  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Origin",
      isDev() ? "*" : "<put-production-domain-here>"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-   Type, Accept, Authorization"
    );
    next();
  });
};
