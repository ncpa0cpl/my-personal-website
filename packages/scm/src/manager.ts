import chalk from "chalk";
import locales from "i18n-locales";
import { walk } from "node-os-walk";
import fs from "node:fs/promises";
import path from "node:path";
import { ContentReader } from "./content-reader";
import type {
  ContentLoader,
  ContentLoaderConstructor,
} from "./loader-interface";
import type { Locales } from "./locales.type";

export type ContentEntry = {
  loader: ContentLoader<any>;
  content: any;
  key: string;
  language: string;
};

export type LoaderExts<L extends ContentLoader<any>> =
  L["supportedExtensions"][number];

export type LoaderType<L extends ContentLoader<any>> = ReturnType<
  L["parseContent"]
>;

export type LoaderTypeFor<
  L extends ContentLoader<any>,
  K extends string,
> = L["contentTypes"][K];

export type ReaderFor<
  L extends ContentLoader<any>,
  K extends Record<string, string>,
> = ContentReader<L, K[Extract<keyof K, LoaderExts<L>>]>;

function extractLoaderName(object: any): string {
  if (object.name) return object.name;

  if (
    object.constructor &&
    object.constructor.name &&
    object.constructor.name !== "Object"
  )
    return object.constructor.name;

  const prototype = Object.getPrototypeOf(object);
  if (prototype !== Object.getPrototypeOf({}))
    return prototype.constructor.name;

  return "Unnamed Loader";
}

export class ContentManager<K extends Record<string, string>> {
  static async create<K extends Record<string, string>>(
    contentLocation: string,
    loaders: Array<ContentLoaderConstructor<any>>,
  ) {
    const manager = new ContentManager<K>(contentLocation, loaders);
    await manager.initialize();
    return manager;
  }

  private contents: Array<ContentEntry> = [];
  private availableLanguages: string[] = [];
  private loaders: Array<ContentLoader<any>>;

  private constructor(
    private contentLocation: string,
    loaders: Array<ContentLoaderConstructor<any>>,
  ) {
    this.loaders = loaders.map((loader) => new loader());
  }

  private checkLanguageConsistency() {
    const incompleteContentFiles = new Set<string>();

    const languageEntries = new Map<string, Array<ContentEntry>>();
    for (const language of this.availableLanguages) {
      const entries = this.contents.filter(
        (entry) => entry.language === language,
      );
      languageEntries.set(language, entries);
    }

    const languageEntriesValues = [...languageEntries.values()];
    for (const languageContents of languageEntriesValues) {
      for (const content of languageContents) {
        if (
          languageEntriesValues.some(
            (entries) => !entries.some((entry) => entry.key === content.key),
          )
        ) {
          incompleteContentFiles.add(content.key);
        }
      }
    }

    for (const incompleteContentFile of incompleteContentFiles) {
      console.warn(
        chalk.yellowBright(
          `Content file '${incompleteContentFile}' is not available in all languages.`,
        ),
      );
    }
  }

  private testAgainstLoader(loader: ContentLoader<any>, filepath: string) {
    const lowercased = filepath.toLowerCase();
    const extSupported = loader.supportedExtensions.some((e) =>
      lowercased.endsWith(e.toLowerCase()),
    );

    if (!extSupported) return false;

    if (!loader.shouldLoad) return true;

    return loader.shouldLoad(filepath);
  }

  private isFileSupported(filepath: string) {
    return this.loaders.some((loader) =>
      this.testAgainstLoader(loader, filepath),
    );
  }

  private getLoadersForFile(filepath: string) {
    return this.loaders.filter((loader) =>
      this.testAgainstLoader(loader, filepath),
    );
  }

  private async addContent(filepath: string, language: string) {
    const loaders = this.getLoadersForFile(filepath);
    const file = await fs.readFile(filepath);
    const relativeLocation = path.relative(
      path.resolve(this.contentLocation, language),
      filepath,
    );
    const key = relativeLocation
      .split(RegExp(`(?<=(?<!\\\\)(?:\\\\\\\\)*)\\${path.sep}`))
      .join(".")
      .replace(/\.[^.]+$/, "");

    for (const loader of loaders) {
      try {
        const parsed = await loader.parseContent(Buffer.from(file), {
          extension: path.extname(filepath),
          fullPath: filepath,
          relativePath: relativeLocation,
        });
        this.contents.push({ loader, content: parsed, key, language });
      } catch (e) {
        console.error(
          chalk.redBright(
            `${extractLoaderName(
              loader,
            )} loader failed to parse file: [ ${filepath} ]`,
          ),
        );
      }
    }
  }

  private async initialize() {
    const loadOperations: Promise<void>[] = [];

    const directories = await fs.readdir(this.contentLocation);

    for (const directory of directories) {
      if (!locales.includes(directory)) continue;
      this.availableLanguages.push(directory);
      const dirPath = path.join(this.contentLocation, directory);

      for await (const [root, _, files] of walk(dirPath)) {
        for (const file of files) {
          const filepath = path.resolve(root, file.name);

          if (!this.isFileSupported(filepath)) continue;

          loadOperations.push(this.addContent(filepath, directory));
        }
      }
    }

    await Promise.all(loadOperations);

    this.checkLanguageConsistency();
  }

  getReader<L extends ContentLoader<any>>(
    loader: new () => L,
    language: Locales,
  ): ReaderFor<L, K> {
    if (
      this.loaders.some((l) => {
        return l instanceof loader;
      })
    ) {
      // @ts-expect-error
      return new ContentReader(this, loader, language);
    }

    throw new Error(
      `${extractLoaderName(loader)} loader not registered with this manager.`,
    );
  }
}
