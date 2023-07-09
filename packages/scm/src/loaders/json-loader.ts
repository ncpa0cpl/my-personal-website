type DefaultContentMap = Record<string, unknown>;

export class JsonLoader<ContentTypeMap = DefaultContentMap> {
  readonly contentTypes!: ContentTypeMap;
  readonly supportedExtensions = [".json"] as const;

  parseContent(content: Buffer): unknown {
    return JSON.parse(content.toString("utf-8"));
  }
}
