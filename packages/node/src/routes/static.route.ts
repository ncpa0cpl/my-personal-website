import type { Express } from "express";
import express from "express";
import path from "path";

export default (serverApp: Express) => {
  const staticDirPath = path.resolve(__dirname, "../../esm/static");
  serverApp.use(
    "/static",
    express.static(staticDirPath, { fallthrough: true })
  );

  const webComponentsDirPath = path.resolve(
    __dirname,
    "../../../../browser/dist"
  );

  serverApp.use(
    "/js-modules",
    express.static(webComponentsDirPath, { index: "index.js" })
  );
};
