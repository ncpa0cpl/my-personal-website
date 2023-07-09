type DefaultContentMap = Record<string, string>;

export class MarkdownLoader<ContentTypeMap = DefaultContentMap> {
  readonly contentTypes!: ContentTypeMap;
  readonly supportedExtensions = [".md"] as const;

  parseContent(content: Buffer): string {
    return content.toString("utf-8");
  }
}
