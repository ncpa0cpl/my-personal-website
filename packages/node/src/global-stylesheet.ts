import { minify } from "csso";
import path from "path";
import { isDev } from "./utilities/is-dev";
import { readGlob } from "./utilities/read-glob";
import { stripCssComments } from "./utilities/strip-css-comments";

const cssFiles = readGlob("**/*.css", path.resolve(__dirname, "./views"));

cssFiles.sort((a, b) => {
  return a.path.toLowerCase() < b.path.toLowerCase() ? -1 : 1;
});
cssFiles.sort((a, b) => a.path.split("/").length - b.path.split("/").length);

let stylesheet = "";

for (const cssFile of cssFiles) {
  const clean = stripCssComments(cssFile.content);
  stylesheet += `\n/* ${cssFile.path} */\n${clean}`;
}

if (!isDev()) {
  stylesheet = minify(stylesheet).css;
}

export { stylesheet };
