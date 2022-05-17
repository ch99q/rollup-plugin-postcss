import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  rootDir: __dirname,
  entries: ["src/index"],
  hooks: {
    "rollup:options": (ctx, options) => {
      const index =
        options.plugins?.findIndex((p) => p && p.name === "node-resolve") || 0;
      options.plugins?.splice(index, 0, require(".."));
      options.plugins?.pop();
    },
  },
});
