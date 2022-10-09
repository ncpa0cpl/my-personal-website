import { type Express } from "express";
import { LocalizationService } from "../localization/localization-service";
import { getQueryParam } from "../utilities/get-query-param";

export const setupLanguageSelectionMiddleware = (server: Express) => {
  server.use((req, _, next) => {
    const lang = getQueryParam(req, "lang");
    if (lang && LocalizationService.getSupportedLanguages().includes(lang)) {
      req.session.lang = lang;
      return void req.session.save(next);
    }
    next();
  });
};
