import type { ComponentApi } from "jsxte";
import { RequestResponseContext } from "jsxte-web-frames";
import { LocalizationService } from "../../../localization/localization-service";
import { Log } from "../../../utilities/log";
import { LocalizationContext } from "./localization-context";

declare module "express-session" {
  interface SessionData {
    lang: string;
  }
}

export const LocalizationContextProvider = (
  props: JSXTE.PropsWithChildren<{}>,
  { ctx }: ComponentApi,
) => {
  const req = ctx.get(RequestResponseContext)?.req;

  const current = ctx.get(LocalizationContext);

  const lang = req?.session.lang;

  if (lang && lang !== current?.language) {
    try {
      ctx.set(LocalizationContext, {
        language: lang,
        translator: LocalizationService.forLanguage(lang),
      });
    } catch (e) {
      Log.warning(
        `Translations for non defined language was requested. [${lang}]`,
      );
    }
  }

  return <>{props.children}</>;
};
