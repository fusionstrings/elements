/** @jsxImportSource preact */
import { renderToString } from "preact-render-to-string";
import { Button } from "#button";
import { serveFile } from "jsr:@std/http/file-server";
import browserImportMap from "./importmap.json" with { type: "json" };
import { DSDButton } from "#components/dsd-button";
import { count } from "#signals/counter";
import { TemplateButton } from "#template-button";
import { TemplateCounter } from "#template-counter";
import { DSDCounter } from "#components/dsd-counter";

const routes = [
  {
    pattern: new URLPattern({ pathname: "/elements" }),
    file: "elements.html",
  },
  {
    pattern: new URLPattern({ pathname: "/_dnt.polyfills.js" }),
    file: "package/esm/_dnt.polyfills.js",
  },
  {
    pattern: new URLPattern({ pathname: "/dom/main.js" }),
    file: "package/esm/dom/main.js",
  },
  {
    pattern: new URLPattern({ pathname: "/signals/counter.js" }),
    file: "package/esm/signals/counter.js",
  },
  {
    pattern: new URLPattern({ pathname: "/components/counter.js" }),
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
    pattern: new URLPattern({ pathname: "/components/button.js" }),
    file: "package/esm/components/button.js",
  },
  {
    pattern: new URLPattern({ pathname: "/templates/counter.css" }),
    file: "templates/counter.css",
  },
  {
    pattern: new URLPattern({ pathname: "/elements/counter.js" }),
    file: "package/esm/elements/counter.js",
  },
  {
    pattern: new URLPattern({ pathname: "/elements/button.js" }),
    file: "package/esm/elements/button.js",
  },
  {
    pattern: new URLPattern({ pathname: "/elements/counter-preact.js" }),
    file: "package/esm/elements/counter-preact.js",
  },
  {
    pattern: new URLPattern({ pathname: "/elements/button-preact.js" }),
    file: "package/esm/elements/button-preact.js",
  },
];

export default {
  fetch(request: Request) {
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
    const html = renderToString(
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>DSD</title>
          <script
            type="importmap"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(browserImportMap, null, 2),
            }}
          />
          <TemplateCounter id="template-counter" />
          <TemplateButton id="template-button" />
          <script type="module" src="/dom/main.js"></script>
        </head>
        <body>
          <header>
            <nav>
              <ul>
                <li><a href="/elements">Elements</a></li>
              </ul>
            </nav>
          </header>
          <main>
            <h1>Declarative Shadow DOM study</h1>

            <section>
              <h2>Button Element</h2>
              <button type="button">Count</button>
            </section>

            <section>
              <h2>Button Component</h2>
              <template shadowrootmode="open">
                <Button />
              </template>
            </section>

            <section>
              <h2>Button Custom Element</h2>
              <element-counter>{count}</element-counter>
              <element-button>Count</element-button>
            </section>

            <section>
              <h2>Button Custom Element (Preact)</h2>
              <dsd-counter-preact>{count}</dsd-counter-preact>
              <dsd-button-preact>Count</dsd-button-preact>
            </section>

            <section>
              <h2>Button Component with Declarative Shadow DOM (Preact)</h2>
              <DSDCounter />
              <DSDButton label="Count" />
            </section>
          </main>
        </body>
      </html>,
    );
    return new Response(
      `
      <!DOCTYPE html>${html}`,
      {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      },
    );
  },
};
