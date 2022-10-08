import { stylesheet } from "../../../global-stylesheet";
import { LocalizationContextProvider } from "../../contexts/localization-context/provider";

const DEFAULT_PAGE_TITLE = "Page Title";

export const PageBase = (
  props: JSXTE.PropsWithChildren<{ pageTitle?: string }>
): JSX.Element => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="IE=edge" />
        <title>{props.pageTitle ?? DEFAULT_PAGE_TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {stylesheet}
        <script src="/static/main.mjs" type="module"></script>
      </head>
      <body>
        <script src="/js-modules/theme-switch.js"></script>
        <LocalizationContextProvider>
          {props.children}
        </LocalizationContextProvider>
      </body>
    </html>
  );
};
