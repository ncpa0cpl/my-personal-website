export interface ContentPath {
  readonly fullPath: string;
  readonly relativePath: string;
  readonly extension: string;
}

export interface ContentLoader<
  T,
  E extends readonly string[] = readonly string[],
  CT extends Readonly<Record<string, any>> = Readonly<Record<string, any>>,
> {
  readonly contentTypes: CT;
  readonly supportedExtensions: E;
  parseContent(content: Buffer, filepath: ContentPath): T | Promise<T>;
  shouldLoad?(filepath: string): boolean;
}

export interface ContentLoaderConstructor<
  T,
  E extends readonly string[] = readonly string[],
  CT extends Readonly<Record<string, any>> = Readonly<Record<string, any>>,
> {
  new (): ContentLoader<T, E, CT>;
}
