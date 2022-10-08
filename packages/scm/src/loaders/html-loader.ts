export const HtmlLoader = class HtmlLoader {
  static supportedExtensions = [".html", ".htm"] as const;

  static parseContent(content: Buffer): string {
    return content.toString("utf-8");
  }
};
