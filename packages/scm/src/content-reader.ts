import type { ContentLoader } from "./loader-interface";
import type { ContentEntry, ContentManager } from "./manager";

export class ContentReader<T, K extends string> {
  private supportedContent: Array<ContentEntry> = [];
  private constructor(
    manager: ContentManager<any>,
    loader: ContentLoader<T>,
    language: string
  ) {
    this.supportedContent = manager["contents"].filter(
      (entry) => entry.loader === loader && entry.language === language
    );
  }

  public get<V = T>(key: K): V {
    const entry = this.supportedContent.find((entry) => entry.key === key);
    if (!entry) throw new Error(`Content for key ${key} not found.`);
    return entry.content;
  }

  public getMatches<V = T>(test: RegExp): Array<V> {
    return this.supportedContent
      .filter((entry) => test.test(entry.key))
      .map((entry) => entry.content);
  }
}
