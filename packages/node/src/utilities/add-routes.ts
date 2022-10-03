import type { Express } from "express";

export const addRoutes = (
  serverApp: Express,
  routes: Array<(serverApp: Express) => void>
) => {
  for (const r of routes) {
    r(serverApp);
  }
};
