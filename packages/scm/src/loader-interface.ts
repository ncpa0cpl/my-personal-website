export interface ContentPath {
  readonly fullPath: string;
  readonly relativePath: string;
  readonly extension: string;
}

export interface ContentLoader<
  T,
  E extends readonly string[] = readonly string[]
> {
  readonly supportedExtensions: E;
  parseContent(content: Buffer, filepath: ContentPath): T | Promise<T>;
  shouldLoad?(filepath: string): boolean;
}
