export const TextLoader = class TextLoader {
  static supportedExtensions = [".txt"] as const;

  static parseContent(content: Buffer): string {
    return content.toString("utf-8");
  }
};
