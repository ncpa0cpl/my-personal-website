const { build } = require("@ncpa0cpl/nodepack");
const path = require("path");

async function main() {
  try {
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
        sourcemap: "inline",
      },
      extMapping: {
        ".css": ".css",
      },
      watch: true,
    });

    build({
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
        sourcemap: "inline",
      },
      extMapping: {
        ".svg": ".svg",
        ".ttf": ".ttf",
      },
      watch: true,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
