import type { ContextMap } from "jsxte";
import { RequestResponseContext } from "jsxte-web-frames";
import { LocalizationService } from "../../../utilities/localization/localization-service";
import { Log } from "../../../utilities/log";
import { LocalizationContext } from "./localization-context";

declare module "express-session" {
  interface SessionData {
    lang: string;
  }
}

export const LocalizationContextProvider = (
  props: JSXTE.PropsWithChildren<{}>,
  context: ContextMap
) => {
  const req = context.has(RequestResponseContext)
    ? context.get(RequestResponseContext).req
    : undefined;

  const current = context.has(LocalizationContext)
    ? context.get(LocalizationContext)
    : undefined;

  const lang = req?.session.lang;

  if (lang && lang !== current?.language) {
    try {
      context.set(LocalizationContext, {
        language: lang,
        translator: LocalizationService.forLanguage(lang),
      });
    } catch (e) {
      Log.warning(
        `Translations for non defined language was requested. [${lang}]`
      );
    }
  }

  return <>{props.children}</>;
};
