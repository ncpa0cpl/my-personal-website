const { build } = require("@ncpa0cpl/nodepack");
const path = require("path");

async function main() {
  const isDev = process.env.NODE_ENV === "development";
  const watch = process.argv.includes("--watch");

  const buildForServer = () =>
    build({
      target: "es2020",
      tsConfig: path.resolve(__dirname, "../tsconfig.json"),
      srcDir: path.resolve(__dirname, "../src"),
      outDir: path.resolve(__dirname, "../dist"),
      formats: ["legacy"],
      exclude: [/.+\/static\/.+/, /\.d\.ts$/],
      decoratorsMetadata: true,
      esbuildOptions: {
        jsx: "transform",
        jsxImportSource: "jsxte",
        platform: "node",
        sourcemap: isDev ? "inline" : undefined,
        loader: {
          ".html": "copy",
          ".json": "copy",
          ".yaml": "copy",
          ".yml": "copy",
        },
      },
      extMapping: {
        ".css": ".css",
        ".html": ".html",
        ".json": ".json",
        ".yaml": ".yaml",
        ".yml": ".yml",
      },
      watch,
    });

  const buildForBrowser = () =>
    build({
      target: "es2020",
      tsConfig: path.resolve(__dirname, "../tsconfig.json"),
      srcDir: path.resolve(__dirname, "../src"),
      outDir: path.resolve(__dirname, "../dist"),
      formats: ["esm"],
      exclude: [/^(?!.*\/static\/).*/, /\.d\.ts$/],
      esbuildOptions: {
        platform: "browser",
        sourcemap: isDev ? "inline" : undefined,
        loader: {
          ".svg": "copy",
          ".ttf": "copy",
        },
      },
      extMapping: {
        ".svg": ".svg",
        ".ttf": ".ttf",
      },
      watch,
    });

  try {
    await Promise.all([buildForServer(), buildForBrowser()]);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
