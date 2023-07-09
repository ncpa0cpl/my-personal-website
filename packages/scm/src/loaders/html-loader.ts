type DefaultContentMap = { [key: string]: string };

export class HtmlLoader<ContentTypeMap = DefaultContentMap> {
  readonly contentTypes!: ContentTypeMap;
  readonly supportedExtensions = [".html", ".htm"] as const;

  parseContent(content: Buffer): string {
    return content.toString("utf-8");
  }
}
