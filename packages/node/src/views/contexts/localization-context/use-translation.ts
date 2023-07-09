import type { ComponentApi } from "jsxte";
import type { Translation } from "../../../localization/dictionaries/keys";
import { LocalizationService } from "../../../localization/localization-service";
import { LocalizationContext } from "./localization-context";

export const useTranslation = ({ ctx }: ComponentApi) => {
  const { translator } = ctx.get(LocalizationContext) ?? {
    translator: undefined,
  };

  const t = (key: Translation): string => {
    if (translator) {
      return translator.t(key);
    }

    return LocalizationService.t(key);
  };

  return t;
};
