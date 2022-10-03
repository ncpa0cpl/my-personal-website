const fs = require("fs/promises");
const path = require("path");

async function main() {
  const iconsDirPath = path.resolve(__dirname, "../src/static/assets/icons");
  const icons = await fs.readdir(iconsDirPath);

  /** @type string[] */
  const names = [];

  for (const icon of icons) {
    const iconPath = path.parse(icon);
    if (iconPath.ext === ".svg") {
      names.push(iconPath.name);
    }
  }

  const declarationFileContent = `export declare type SvgName = ${names
    .map((n) => `"${n}"`)
    .join(" | ")};`;

  await fs.writeFile(
    path.join(iconsDirPath, "svg-name.d.ts"),
    declarationFileContent
  );
}

main();
