import postcss from "postcss";
import modules from "postcss-modules";
import { Plugin } from "rollup";

const styleInjectPath = require.resolve("./inject").replace(/[\\/]+/g, "/");

type Options = {};

export default (options: Options) =>
  ({
    name: "postcss",

    async transform(code: string, id: string) {
      if (id.endsWith("module.css")) {
        var modulesExported: {
          [key: string]: object;
        } = {};

        const result = await postcss([
          modules({
            getJSON(cssFileName, json) {
              modulesExported[cssFileName] = json;
            },
          }),
        ]).process(code, {
          to: id,
          from: id,
          map: {
            inline: true,
            annotation: false,
          },
        });
        return `import styleInject from '${styleInjectPath}';\nvar styleMapping = ${JSON.stringify(
          modulesExported[id]
        )};\nexport const stylesheet = ${JSON.stringify(
          result.css.replaceAll("\n", "")
        )};\nexport default /*#__PURE__*/(function() {
          styleInject(stylesheet);
          return styleMapping;
        })();`;
      }
    },
  } as Plugin);
