import type { Express } from "express";
import { renderRouted } from "jsxte-htmx";
import { RequestResponseContext } from "jsxte-web-frames";
import url from "url";
import { AppRoutes } from "../../app-routes";
import { LocalizationContextProvider } from "../../views/contexts/localization-context/provider";
import { Entrypoint } from "../../views/root-page";

type OnRequestCallback = (req: Express.Request, res: Express.Response) => any;

const registerEndpoint = (
  server: Express,
  path: string,
  onRequest: OnRequestCallback,
) => {
  console.info(`Registering endpoint: ${path}`);

  server.get(path, async (req, res) => {
    try {
      await onRequest(req, res);

      const isHtmxRequest = req.header("hx-request") === "true";

      const routed = await renderRouted({
        request: {
          headers: req.headers as any,
          path: req.path,
        },
        element: (
          <RequestResponseContext.Provider value={{ req, res }}>
            <LocalizationContextProvider>
              <Entrypoint
                isHtmxRequest={isHtmxRequest}
                requestPath={req.path}
              />
            </LocalizationContextProvider>
          </RequestResponseContext.Provider>
        ),
      });

      routed.addHeaders(res);
      res.send(routed.html);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  });
};

export default (server: Express) => {
  // redirect "/" to "/home"
  server.get("/", (req, res) => {
    const urlParams = new URLSearchParams();

    for (const [key, value] of Object.entries(req.query)) {
      if (typeof value === "string") {
        urlParams.append(key, value);
      }
    }

    const queryRecord = Object.fromEntries(urlParams.entries());

    res.redirect(
      url.format({
        pathname: AppRoutes.home.$(),
        query: queryRecord,
      }),
    );
  });

  registerEndpoint(server, AppRoutes.home.$(), () => {});
  registerEndpoint(server, AppRoutes.career.$(), () => {});
  registerEndpoint(server, AppRoutes.projects.$(), () => {});

  registerEndpoint(server, AppRoutes.home.card.$(), () => {});
};
