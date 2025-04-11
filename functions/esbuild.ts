import * as esbuild from "npm:esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";


const mod = new URL("./dom/main.ts", import.meta.url);

const result = await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: [mod.href],
  outfile: "./dist/dom/main.js",
  bundle: true,
  format: "esm",
});

esbuild.stop();
console.log(result);

//await Deno.writeTextFile("dist/dom/main.js", code); 