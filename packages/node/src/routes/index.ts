import type { Express } from "express";
import glob from "glob";

const routeFiles = glob.sync("**/*.route?(s).?(c|m)js", {
  cwd: __dirname,
  nosort: true,
  nocase: true,
  nodir: true,
});

export const Routes: Array<(serverApp: Express) => void> = routeFiles.map(
  (file) => require("./" + file).default
);
