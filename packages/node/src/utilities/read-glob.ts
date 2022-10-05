import fs from "fs";
import glob from "glob";
import path from "path";

export const readGlob = (pattern: string, cwd?: string) => {
  cwd = cwd ?? process.cwd();

  const files = glob.sync(pattern, {
    cwd,
    nosort: true,
    nocase: true,
    nodir: true,
  });

  return files.map((file) => {
    const fullFilePath = path.resolve(cwd!, "./" + file);
    return {
      path: fullFilePath,
      content: fs.readFileSync(fullFilePath, {
        encoding: "utf8",
      }),
    };
  });
};
