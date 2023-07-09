import YAML from "yaml";
import type { TimelineSegment } from "../views/components/timeline/timeline";

export type CareerTimelineContent = {
  segments: Array<TimelineSegment>;
};

export type ProjectContent = {
  title: string;
  description: string;
  repository: string;
  npm: string;
  order: number;
};

export type YamlContents = {
  "career-timeline": CareerTimelineContent;
  "projects.dilswer": ProjectContent;
  "projects.jsxte": ProjectContent;
};

export class YamlLoader<T = any> {
  readonly contentTypes!: YamlContents;
  readonly supportedExtensions = [".yaml", ".yml"] as const;

  parseContent(file: Buffer): T {
    return YAML.parse(file.toString("utf8")) as T;
  }
}
