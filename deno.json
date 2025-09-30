{
  "name": "@fusionstrings/elements",
  "version": "0.1.0",
  "tasks": {
    "dev": "deno serve --allow-read --allow-write --unstable-raw-imports --allow-env --allow-net --watch service.tsx",
    "serve": "deno serve --allow-read service.tsx",
    "build": "deno run -A functions/dnt.ts",
    "bundle": "deno run -A --unstable-bundle functions/deno-bundle.ts",
    "ssg": "deno run --allow-read --allow-write --allow-env --allow-net functions/ssg.ts"
  },
  "exports": {
    ".": "./service.tsx"
  },
  "imports": {
    "@deno/dnt": "jsr:@deno/dnt@^0.42.3",
    "@jspm/generator": "npm:@jspm/generator@^2.7.1",
    "@preact/signals": "npm:@preact/signals@^2.3.1",
    "@std/fs": "jsr:@std/fs@^1.0.19",
    "#components/button.css": "./components/button.css",
    "#components/button": "./components/button.tsx",
    "#components/counter.css": "./components/counter.css",
    "#components/counter": "./components/counter.tsx",
    "#document": "./components/document.tsx",
    "#functions/stream-html-document": "./functions/stream-html-document.ts",
    "#preact-web-components": "./components/preact-web-components.tsx",
    "#dom/preact-web-components": "./dom/preact-web-components.ts",
    "#deno.json": "./deno.json",
    "#wrangler-config": "./functions/wrangler.ts",
    "#signals/counter": "./signals/counter.ts",
    "@std/http": "jsr:@std/http@^1.0.20",
    "eszip": "https://deno.land/x/eszip@v0.100.0/mod.ts",
    "happy-dom": "npm:happy-dom@^18.0.1",
    "preact-render-to-string": "npm:preact-render-to-string@^6.6.1",
    "preact-custom-element": "npm:preact-custom-element@^4.5.1",
    "preact": "npm:preact@^10.27.2",
    "preact/": "npm:preact/",
    "preact/jsx-runtime": "npm:preact/jsx-runtime"
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "npm:preact",
    "lib": [
      "dom",
      "dom.iterable",
      "dom.asynciterable",
      "esnext",
      "deno.ns",
      "deno.unstable"
    ],
    "strict": true
  },
  "lock": false
}