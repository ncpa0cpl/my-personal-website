export interface ContentLoader<
  T,
  E extends readonly string[] = readonly string[]
> {
  readonly supportedExtensions: E;
  parseContent(content: Buffer, ext: string): T | Promise<T>;
  shouldLoad?(filepath: string): boolean;
}
