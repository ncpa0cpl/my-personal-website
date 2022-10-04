import type { Request } from "express";

export const getQueryParam = (
  req: Request,
  name: string
): string | undefined => {
  const value = req.query[name];

  if (Array.isArray(value)) {
    const firstElement = value[0];

    if (typeof firstElement === "string") {
      return firstElement;
    }
  } else if (typeof value === "string") {
    return value;
  }

  return undefined;
};
