import YAML from "yaml";

export class YamlLoader {
  static readonly supportedExtensions = [".yaml", ".yml"] as const;

  static parseContent(file: Buffer) {
    return YAML.parse(file.toString("utf8"));
  }
}
