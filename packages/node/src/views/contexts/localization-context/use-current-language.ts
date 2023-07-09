import type { ComponentApi } from "jsxte";
import { LocalizationService } from "../../../localization/localization-service";
import { LocalizationContext } from "./localization-context";

export const useCurrentLanguage = ({ ctx }: ComponentApi) => {
  const { language } = ctx.get(LocalizationContext) ?? {
    language: LocalizationService.defaultLanguage,
  };

  return language;
};
