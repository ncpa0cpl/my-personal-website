/** @type {import("snowpack").SnowpackUserConfig} */
module.exports = {
  root: "./src",
  workspaceRoot: "../..",
  buildOptions: {
    out: "./dist",
    clean: true,
  },
  optimize: {
    minify: false,
    treeshake: true,
  },
  plugins: [],
};
