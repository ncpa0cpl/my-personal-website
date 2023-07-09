import { HtmxRoute, HtmxSwitch } from "jsxte-htmx";
import { AppRoutes } from "../app-routes";
import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/navbar";
import { PageBase } from "./components/page-template/page-template";
import { CareerPage } from "./pages/career-page/career-page";
import { HobbyProjectsPage } from "./pages/hobby-projects-page/hobyy-projects-page";
import { HomePage } from "./pages/home-page/home-page";

export const Entrypoint = (): JSX.Element => {
  return (
    <PageBase>
      <Navbar />
      <div id="content-container">
        <HtmxSwitch>
          <HtmxRoute path={AppRoutes.home.$()}>
            <HomePage />
          </HtmxRoute>
          <HtmxRoute path={AppRoutes.career.$()}>
            <CareerPage />
          </HtmxRoute>
          <HtmxRoute path={AppRoutes.projects.$()}>
            <HobbyProjectsPage />
          </HtmxRoute>
        </HtmxSwitch>
      </div>
      <Footer />
    </PageBase>
  );
};
