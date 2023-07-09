import type {
  ContentLoader,
  ContentLoaderConstructor,
} from "./loader-interface";
import type {
  ContentEntry,
  ContentManager,
  LoaderType,
  LoaderTypeFor,
} from "./manager";

export class ContentReader<L extends ContentLoader<any>, K extends string> {
  private supportedContent: Array<ContentEntry> = [];
  private constructor(
    manager: ContentManager<any>,
    loader: ContentLoaderConstructor<any>,
    language: string,
  ) {
    this.supportedContent = manager["contents"].filter(
      (entry) => entry.loader instanceof loader && entry.language === language,
    );
  }

  public get<Key extends K>(key: Key) {
    const entry = this.supportedContent.find((entry) => entry.key === key);
    if (!entry) throw new Error(`Content for key ${key} not found.`);
    return entry.content as LoaderTypeFor<L, Key>;
  }

  public getMatches<V = LoaderType<L>>(test: RegExp): Array<V> {
    return this.supportedContent
      .filter((entry) => test.test(entry.key))
      .map((entry) => entry.content);
  }
}
