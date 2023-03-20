import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./unpkg-path-plugin";
import { fetchPlugin } from "./fetch-plugin";

let service: esbuild.Service;

const getService = async () => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }
};

const bundler = async (rawCode: string) => {
  if (!service) await getService();

  const result = await service.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      "process.env.NODE_ENV": "'production'",
      global: "window",
    },
  });

  return result.outputFiles[0].text;
};

export default bundler;
