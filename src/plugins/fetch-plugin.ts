import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (input: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: input,
          };
        }

        const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cacheResult) return cacheResult;

        const { data, request } = await axios.get(args.path);

        const loader = args.path.match(/.css$/) ? "css" : "jsx";

        const result: esbuild.OnLoadResult = {
          loader,
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    }
  }
};
