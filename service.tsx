/** @jsxImportSource preact */
import { renderToStringAsync } from "preact-render-to-string";
import { serveFile } from "@std/http/file-server";
import { PreactWebComponentsDocument } from "#preact-web-components";
import { build, Parser } from "eszip";
import { dirname } from "jsr:@std/path";

const routes = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    file: "index.html",
  },
  {
    pattern: new URLPattern({ pathname: "/standard-web-components" }),
    file: "standard-web-components.html",
  },
  {
    pattern: new URLPattern({ pathname: "/favicon.ico" }),
    file: "images/favicon/favicon.ico",
  },
  {
    pattern: new URLPattern({ pathname: "/favicon.svg" }),
    file: "images/favicon/favicon.svg",
  },
  {
    pattern: new URLPattern({ pathname: "/favicon-96x96.png" }),
    file: "images/favicon/favicon-96x96.png",
  },
  {
    pattern: new URLPattern({ pathname: "/site.webmanifest" }),
    file: "images/favicon/site.webmanifest",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/components/button.js" }),
    file: "esm/components/button.js",
  },
  {
    pattern: new URLPattern({ pathname: "/components/button.css" }),
    file: "components/button.css",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/components/counter.js" }),
    file: "esm/components/counter.js",
  },
  {
    pattern: new URLPattern({ pathname: "/components/counter.css" }),
    file: "components/counter.css",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/signals/counter.js" }),
    file: "esm/signals/counter.js",
  },
];

async function dependencyGraph({ files }: { files: string[] }) {
  const importMapUrl = import.meta.resolve("#deno.json");
  const eszip = await build(files, undefined, importMapUrl);

  const parser = await Parser.createInstance();
  const specifiers = await parser.parseBytes(eszip);
  await parser.load();

  const sources = new Map<string, string>();
  for (const specifier of specifiers.sort()) {
    sources.set(specifier, await parser.getModuleSource(specifier));
    console.log(specifier);
  }

  const importMap = { imports: {} as Record<string, string> };

  // Create a reverse map from resolved URL to import identifier
  const pathToIdentifier = new Map<string, string>();
  const { default: denoJson } = await import("#deno.json", { with: { type: "json" } });
  for (const [key, value] of Object.entries(denoJson.imports)) {
    try {
      const resolved = import.meta.resolve(value as string);
      pathToIdentifier.set(resolved, key);
    } catch (e) {
      console.error(`Could not resolve ${value}`, e);
    }
  }

  await Deno.mkdir("esm", { recursive: true });
  for (const [key, value] of sources) {
    const identifier = pathToIdentifier.get(key);
    if (identifier) {
      const path = `esm/${identifier.replace("#", "")}.js`;
      await Deno.mkdir(dirname(path), { recursive: true });
      await Deno.writeTextFile(path, value);
      importMap.imports[identifier] = `./${path}`;
    }
  }

  console.log("--- DEBUG START ---");
  console.log("pathToIdentifier MAP:", pathToIdentifier);
  console.log("sources MAP KEYS:", Array.from(sources.keys()));
  console.log("--- DEBUG END ---");
  console.log({ importMap });
  return { eszip, sources, importMap };
}

export default {
  async fetch(request: Request) {
    const method = request.method.toUpperCase();
    if (method !== "GET" && method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { "allow": "GET, HEAD" },
      });
    }

    const { pathname } = new URL(request.url);

    for (const route of routes) {
      if (route.pattern.test({ pathname })) {
        return serveFile(request, route.file);
      }
    }

    if (pathname === '/preact-web-components') {
      const specifier = "#dom/preact-web-components";
      const domScriptURL = import.meta.resolve(specifier);

      const { eszip, sources, importMap } = await dependencyGraph({ files: [domScriptURL] });
      console.log({ eszip, sources, importMap });
      const scriptContents = sources.get(domScriptURL) || '';
      const document = await renderToStringAsync(<PreactWebComponentsDocument title="Preact Web Components" importMap={importMap} scriptContents={[scriptContents]} />);

      const { Generator, clearCache } = await import('@jspm/generator');
      await clearCache();
      const generator = new Generator({
        mapUrl: import.meta.url,
        env: ['production', 'browser', 'module'],
        inputMap: importMap,
        defaultProvider: 'jsdelivr'
      });
      const html = `<!DOCTYPE html>${document}`;
      const response = await generator.htmlInject(html, {
        trace: true,
        esModuleShims: true
      })

      return new Response(response, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    }

    return new Response("Not Found", { status: 404 });

  },
};
