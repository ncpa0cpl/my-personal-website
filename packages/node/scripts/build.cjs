const { build } = require("@ncpa0cpl/nodepack");
const path = require("path");

async function main() {
  try {
    await build({
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
      },
      extMapping: {
        ".css": ".css",
      },
    });

    await build({
      target: "es2020",
      tsConfig: path.resolve(__dirname, "../tsconfig.json"),
      srcDir: path.resolve(__dirname, "../src"),
      outDir: path.resolve(__dirname, "../dist"),
      formats: ["esm"],
      exclude: [/^(?!.*\/static\/).*/, /\.d\.ts$/],
      esbuildOptions: {
        platform: "browser",
        loader: {
          ".svg": "copy",
          ".ttf": "copy",
        },
      },
      extMapping: {
        ".svg": ".svg",
        ".ttf": ".ttf",
      },
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
