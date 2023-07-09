type DefaultContentMap = Record<string, string>;

export class TextLoader<ContentTypeMap = DefaultContentMap> {
  readonly contentTypes!: ContentTypeMap;
  readonly supportedExtensions = [".txt"] as const;

  parseContent(content: Buffer): string {
    return content.toString("utf-8");
  }
}
