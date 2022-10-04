import { type Express } from "express";
import { getQueryParam } from "../utilities/get-query-param";
import { LocalizationService } from "../utilities/localization/localization-service";

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
