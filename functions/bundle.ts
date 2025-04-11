import { bundle } from "jsr:@deno/emit";

const url = new URL("./dom/main.ts", import.meta.url);
const result = await bundle(url, {
    importMap: './deno.json', compilerOptions: {
        "jsx": "react-jsx",
        "jsxImportSource": "npm:preact"
    }, type: 'module'
});

const {code} = result
await Deno.writeTextFile("dist/dom/main.js", code); 
console.log(code?.includes("export default function hello()"));
