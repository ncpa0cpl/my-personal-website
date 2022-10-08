export const JsonLoader = class JsonLoader {
  static supportedExtensions = [".json"] as const;

  static parseContent(content: Buffer): unknown {
    return JSON.parse(content.toString("utf-8"));
  }
};
