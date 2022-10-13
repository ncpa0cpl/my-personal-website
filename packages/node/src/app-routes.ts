import { createRoot, route } from "./utilities/application-map/application-map";

export const AppRoutes = createRoot({
  home: {},
  career: {
    company: route(":company"),
  },
  projects: {},
});
