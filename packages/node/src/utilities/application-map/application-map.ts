export const IS_PARAM = Symbol();

export type ISPARAMSYM = typeof IS_PARAM;

export type SubRoutePath = {
  [key: string]: Readonly<SubRoutePath>;
};

export type RouteTreeRoot = Readonly<Record<string, SubRoutePath>>;

export type PathGetterOptions = {
  relative?: boolean;
  params?: Record<string, string | string[]>;
  locationHash?: string;
};

export type RoutePathGetter = {
  /**
   * Getter function that returns the full path to the specified Route.
   *
   * @param relative - Default: true, whether the path should be
   *   relative (true) or absolute (false).
   */
  $(options?: PathGetterOptions): string;
  /** Getter function that returns the full path to the specified Route. */
  toString(): string;
};

export type RouteParameter<S> = {
  $as(param: string | number): RouteProxy<S> & RoutePathGetter;
} & RouteProxy<S>;

export type RouteProxy<S> = {
  [K in keyof S]: (ISPARAMSYM extends keyof S[K]
    ? RouteParameter<S[K]>
    : K extends `:${string}`
    ? RouteParameter<S[K]>
    : RouteProxy<S[K]>) &
    RoutePathGetter;
};

export const ROUTE_NAME = Symbol("ROUTE_NAME");

const buildPath = (baseUrl: string, options?: PathGetterOptions) => {
  let result = options?.relative === false ? "" : "/";
  result += baseUrl;

  if (options?.params) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(options.params)) {
      if (typeof value === "string") {
        params.set(key, value);
      } else {
        for (const v of value) {
          params.append(key, v);
        }
      }
    }

    result += "?" + params.toString();
  }

  if (options?.locationHash) {
    result += "#" + options.locationHash.replace(/^#/, "");
  }

  return result;
};

const RouteProxyFor = <S extends SubRoutePath>(
  route: S,
  parents: string[] = []
): RouteProxy<S> => {
  const getPath = (v?: string) => (v ? [...parents, v] : parents).join("/");

  return new Proxy(route, {
    get(_, routeKey: string) {
      let name = "";

      if (
        typeof route[routeKey] === "object" &&
        ROUTE_NAME in route[routeKey]!
      ) {
        // @ts-ignore
        name = route[routeKey][ROUTE_NAME];
      } else {
        name = routeKey;
      }

      if (routeKey === "$") {
        return (options?: PathGetterOptions) => buildPath(getPath(), options);
      }

      if (routeKey === "toString") {
        return () => buildPath(getPath(), { relative: true });
      }

      if (routeKey === "$as") {
        return (param: string | number) =>
          RouteProxyFor(route, [...parents.slice(0, -1), param.toString()]);
      }

      if (routeKey in route) {
        return RouteProxyFor(route[routeKey]!, [...parents, name]);
      }
    },
    set() {
      throw new Error("Cannot assign a value on a readonly object.");
    },
  }) as any;
};

export const createRoot = <R extends RouteTreeRoot>(root: R) =>
  RouteProxyFor(root);

function route<N extends string, R extends SubRoutePath = {}>(
  name: N,
  route?: R
): N extends `:${string}` ? Record<ISPARAMSYM, true> & R : R;
function route<R extends SubRoutePath = {}>(route?: R): R;
function route(arg_0: any, arg_1?: any) {
  let name: string | undefined = undefined;
  let route: object;

  if (typeof arg_0 === "object") {
    route = arg_0;
  } else {
    name = arg_0;
    route = arg_1 ?? {};
    Object.assign(route, { [ROUTE_NAME]: name });
  }

  return route!;
}

export { route };
