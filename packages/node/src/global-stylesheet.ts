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
  if (isDev()) {
    stylesheet += `\n<style>${cssFile.content}</style>`;
  } else {
    const clean = minify(stripCssComments(cssFile.content));
    stylesheet += `\n<style>${clean.css}</style>`;
  }
}

export { stylesheet };
