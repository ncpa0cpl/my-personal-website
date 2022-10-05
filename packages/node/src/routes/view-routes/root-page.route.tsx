import type { Express } from "express";
import { registerFrameView } from "jsxte-web-frames";
import { CareerPage } from "../../views/frames/career-page/career-page";
import { HobbyProjectsPage } from "../../views/frames/hobby-projects-page/hobyy-projects-page";
import { HomePage } from "../../views/frames/home-page/home-page";
import { RootPage } from "../../views/root-page";
import { MainUrl } from "./main-urls";

export default (server: Express) => {
  registerFrameView(server, "/", RootPage);

  // Sub frames
  registerFrameView(server, MainUrl.Home, HomePage);
  registerFrameView(server, MainUrl.Career, CareerPage);
  registerFrameView(server, MainUrl.HobbyProjects, HobbyProjectsPage);
};
