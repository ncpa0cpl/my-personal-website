export const MarkdownLoader = class MarkdownLoader {
  static supportedExtensions = [".md"] as const;

  static parseContent(content: Buffer): string {
    return content.toString("utf-8");
  }
};
