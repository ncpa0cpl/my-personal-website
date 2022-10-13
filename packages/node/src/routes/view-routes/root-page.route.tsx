import type { Express } from "express";
import { registerFrameView } from "jsxte-web-frames";
import { AppRoutes } from "../../app-routes";
import { CareerPage } from "../../views/pages/career-page/career-page";
import { HobbyProjectsPage } from "../../views/pages/hobby-projects-page/hobyy-projects-page";
import { HomePage } from "../../views/pages/home-page/home-page";
import { RootPage } from "../../views/root-page";

export default (server: Express) => {
  registerFrameView(server, "/", RootPage);

  // Sub frames
  registerFrameView(server, AppRoutes.home.$(), HomePage);
  registerFrameView(server, AppRoutes.career.$(), CareerPage);
  registerFrameView(server, AppRoutes.projects.$(), HobbyProjectsPage);
};
