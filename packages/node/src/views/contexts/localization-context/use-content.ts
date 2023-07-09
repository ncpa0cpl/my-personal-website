import type { ComponentApi } from "jsxte";
import type { Locales } from "scm";
import { HtmlLoader } from "scm";
import { contentManager } from "../../../content/manager";
import { YamlLoader } from "../../../content/yaml-loader";
import { useCurrentLanguage } from "./use-current-language";

export const useContent = (context: ComponentApi) => {
  const locale = useCurrentLanguage(context);

  const html = contentManager.getReader(HtmlLoader, locale as Locales);
  const yaml = contentManager.getReader(YamlLoader, locale as Locales);

  return { html, yaml };
};
