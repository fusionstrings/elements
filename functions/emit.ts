import { transpile } from "jsr:@deno/emit";

const url = new URL("./components/button.tsx", import.meta.url);
const result = await transpile(url, {
    importMap: './deno.json', compilerOptions: {
        "jsx": "react-jsx",
        "jsxImportSource": "npm:preact"
    }
});

const code = result.get(url.href);
console.log(code?.includes("export default function hello()"));
