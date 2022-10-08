import type { ContentLoader } from "./loader-interface";
import type { ContentEntry, ContentManager } from "./manager";

export class ContentReader<T, K extends string> {
  private supportedContent: Array<ContentEntry> = [];
  private constructor(
    private manager: ContentManager,
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
}
