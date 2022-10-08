import type { ContextMap } from "jsxte";
import type { Locales } from "scm";
import { HtmlLoader, JsonLoader } from "scm";
import { contentManager } from "../../../content/manager";
import { useCurrentLanguage } from "./use-current-language";

export const useContent = (context: ContextMap) => {
  const locale = useCurrentLanguage(context);
  const htmlLoader = contentManager.getReader(HtmlLoader, locale as Locales);
  const jsonLoader = contentManager.getReader(JsonLoader, locale as Locales);

  return { html: htmlLoader, json: jsonLoader };
};
