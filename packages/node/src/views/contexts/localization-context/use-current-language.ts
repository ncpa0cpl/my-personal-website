import type { ContextMap } from "jsxte";
import { LocalizationService } from "../../../localization/localization-service";
import { LocalizationContext } from "./localization-context";

export const useCurrentLanguage = (context: ContextMap) => {
  const { language } = context.has(LocalizationContext)
    ? context.get(LocalizationContext)
    : { language: LocalizationService.defaultLanguage };

  return language;
};
