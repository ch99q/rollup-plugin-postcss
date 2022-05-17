import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: ["src/index", "src/inject"],
  rollup: {
    emitCJS: true,
  }
});
