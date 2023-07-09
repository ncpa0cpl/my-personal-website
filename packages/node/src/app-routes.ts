import { createRoot, route } from "./utilities/application-map/application-map";

export const AppRoutes = createRoot({
  home: {
    card: route(":card"),
  },
  career: {
    company: route(":company"),
  },
  projects: {},
});
