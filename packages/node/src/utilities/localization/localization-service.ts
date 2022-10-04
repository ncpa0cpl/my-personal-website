import { TranslationsEN } from "./dictionaries/dict-en";
import { TranslationsPL } from "./dictionaries/dict-pl";
import type { Translation, TranslationDictionary } from "./dictionaries/keys";

export class LocalizationService {
  public static readonly defaultLanguage: string = "en";
  private static readonly translations = new Map<string, TranslationDictionary>(
    [
      ["en", TranslationsEN],
      ["pl", TranslationsPL],
    ]
  );

  private static getLanguage(): TranslationDictionary {
    const translation = this.translations.get(this.defaultLanguage);

    if (translation === undefined) {
      throw new Error(
        `Translation for language ${this.defaultLanguage} not found.`
      );
    }

    return translation;
  }

  public static t(key: Translation): string {
    return this.getLanguage()[key];
  }

  public static forLanguage(language: string): LocalizationService {
    const instance = new LocalizationService(language);
    instance.getLanguage();

    return instance;
  }

  public static getSupportedLanguages(): string[] {
    return Array.from(this.translations.keys());
  }

  constructor(private language: string) {}

  private getLanguage(): TranslationDictionary {
    const translation = LocalizationService.translations.get(this.language);

    if (translation === undefined) {
      throw new Error(`Translation for language ${this.language} not found.`);
    }

    return translation;
  }

  public t(key: Translation): string {
    return this.getLanguage()[key];
  }
}
