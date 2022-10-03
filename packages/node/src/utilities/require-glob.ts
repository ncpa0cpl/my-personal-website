import glob from "glob";
import path from "path";

export const requireGlob = <T>(pattern: string, cwd?: string) => {
  cwd = cwd ?? process.cwd();

  const files = glob.sync(pattern, {
    cwd,
    nosort: true,
    nocase: true,
    nodir: true,
  });

  return files.map(
    (file): T => require(path.resolve(cwd!, "./" + file)).default
  );
};
