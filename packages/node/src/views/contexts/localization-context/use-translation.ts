import type { ContextMap } from "jsxte";
import type { Translation } from "../../../utilities/localization/dictionaries/keys";
import { LocalizationService } from "../../../utilities/localization/localization-service";
import { LocalizationContext } from "./localization-context";

export const useTranslation = (context: ContextMap) => {
  const { translator } = context.has(LocalizationContext)
    ? context.get(LocalizationContext)
    : { translator: undefined };

  const t = (key: Translation): string => {
    if (translator) {
      return translator.t(key);
    }

    return LocalizationService.t(key);
  };

  return t;
};
