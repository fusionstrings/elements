/** @jsxImportSource preact */
import { renderToStringAsync } from "preact-render-to-string";
import { serveFile } from "jsr:@std/http/file-server";
import { Home } from "#home";

declare module 'preact/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'element-counter': HTMLAttributes<HTMLElement>;
      'element-button': HTMLAttributes<HTMLElement>;
      'dsd-counter-preact': HTMLAttributes<HTMLElement>;
      'dsd-button-preact': HTMLAttributes<HTMLElement>;
    }
  }
}

const routes = [
  {
    pattern: new URLPattern({ pathname: "/elements" }),
    file: "elements.html",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/_dnt.polyfills.js" }),
    file: "package/esm/_dnt.polyfills.js",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/dom/main.js" }),
    file: "package/esm/dom/main.js",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/signals/counter.js" }),
    file: "package/esm/signals/counter.js",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/components/counter.js" }),
    file: "package/esm/components/counter.js",
  },
  {
    pattern: new URLPattern({ pathname: "/templates/template-button.js" }),
    file: "package/esm/templates/template-button.js",
  },
  {
    pattern: new URLPattern({ pathname: "/templates/button.css" }),
    file: "templates/button.css",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/components/button.js" }),
    file: "package/esm/components/button.js",
  },
  {
    pattern: new URLPattern({ pathname: "/templates/counter.css" }),
    file: "templates/counter.css",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/elements/counter.js" }),
    file: "package/esm/elements/counter.js",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/elements/button.js" }),
    file: "package/esm/elements/button.js",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/elements/counter-preact.js" }),
    file: "package/esm/elements/counter-preact.js",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/elements/button-preact.js" }),
    file: "package/esm/elements/button-preact.js",
  },
];

async function documentHome() {
  const html = await renderToStringAsync(
      <Home />
    );

    return `<!DOCTYPE html>${html}`;
}

export default {
  async fetch(request: Request) {
    const { pathname } = new URL(request.url);

    for (const route of routes) {
      if (route.pattern.test({ pathname })) {
        return serveFile(request, route.file);
      }
    }

    if (pathname === "/favicon.ico") {
      return new Response(
        "Favicon not found",
        {
          status: 404,
          headers: {
            "content-type": "text/plain;charset=UTF-8",
          },
        },
      );
    }
    const document = await documentHome();
    return new Response(
      document,
      {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      },
    );
  },
};

export { documentHome }