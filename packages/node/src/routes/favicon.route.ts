import type { Express } from "express";

export default (server: Express) => {
  server.get("/favicon.ico", (req, res) => {
    res.redirect(301, "/static/assets/favicon.ico");
  });
};
