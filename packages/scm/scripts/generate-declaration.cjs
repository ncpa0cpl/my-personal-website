const path = require("path");
const { walk } = require("node-os-walk");
const fs = require("fs/promises");

function showHelp() {
  console.log(
    "Usage: generate-declaration -d <directory-path> -o <output-path>\n"
  );
  // describe parameters: -d for the directory containing content files, -o for the output path to the declaration file, -ext for the supported extensions
  console.log(`  -d\t\t(required) The directory containing content files.`);
  console.log(`  -o\t\t(required) The output path to the declaration file.`);
  console.log(`  -ext\t\tThe supported extensions.`);
}

async function main() {
  try {
    if (process.argv.includes("-h") || process.argv.includes("--help")) {
      showHelp();
      return;
    }

    // extract param that comes after `-d` from args
    const directoryPath = process.argv[process.argv.indexOf("-d") + 1];
    // extract param that comes after `-o` from args
    const outputPath = process.argv[process.argv.indexOf("-o") + 1];
    // extract param that comes after `-ext` from args
    const extensions = process.argv[process.argv.indexOf("-ext") + 1];

    const supportedExtensions = extensions.split(",");

    const isExtSupported = (ext) =>
      !!extensions ? supportedExtensions.includes(ext) : true;

    if (
      !directoryPath ||
      !outputPath ||
      directoryPath.startsWith("-") ||
      outputPath.startsWith("-")
    ) {
      console.error(
        "Invalid parameters. Usage: generate-declaration -d <directory-path> -o <output-path>"
      );
      process.exit(1);
    }

    /** @type Map<string, Set<string>> */
    const contentKeys = new Map();

    /**
     * @param {string} ext
     * @param {string} key
     */
    const addKey = (ext, key) => {
      if (!contentKeys.has(ext)) {
        contentKeys.set(ext, new Set());
      }
      contentKeys.get(ext).add(key);
    };

    const dir = path.resolve(process.cwd(), directoryPath);

    const languageDirs = await fs.readdir(dir, { withFileTypes: true });

    for (const languageDir of languageDirs) {
      if (languageDir.isDirectory()) {
        const languageDirPath = path.join(dir, languageDir.name);

        for await (const [root, _, files] of walk(languageDirPath)) {
          for (const file of files) {
            if (isExtSupported(path.extname(file.name))) {
              const filePath = path.resolve(root, file.name);
              const relativeLocation = path.relative(languageDirPath, filePath);
              const key = relativeLocation
                .split(RegExp(`(?<=(?<!\\\\)(?:\\\\\\\\)*)\\${path.sep}`))
                .join(".")
                .replace(/\.[^.]+$/, "");
              addKey(path.extname(filePath), key);
            }
          }
        }
      }
    }

    const declarationFileContent = `export declare type ContentKey = {\n${Array.from(
      contentKeys.entries()
    )
      .map(
        ([ext, keys]) =>
          `  "${ext}": ${Array.from(keys)
            .map((k) => `"${k}"`)
            .join(" | ")};`
      )
      .join("\n")}\n};`;

    await fs.writeFile(
      path.resolve(process.cwd(), outputPath),
      declarationFileContent
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
