import { defineContext } from "jsxte";
import type { LocalizationService } from "../../../localization/localization-service";

export const LocalizationContext = defineContext<{
  language: string;
  translator: LocalizationService;
}>();
