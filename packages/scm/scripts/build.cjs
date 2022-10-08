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
      declarations: true,
      esbuildOptions: {
        platform: "node",
      },
      watch: !!process.argv.includes("--watch"),
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
