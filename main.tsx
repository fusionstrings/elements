/** @jsxImportSource preact */
import { renderToString } from "preact-render-to-string";
import { Button } from "#button";
import { DSDButton } from "#dsd-button";
import { serveFile } from "jsr:@std/http/file-server";
import browserImportMap from "./importmap.json" with { type: "json" };
export default {
  fetch(request: Request) {
    const { pathname } = new URL(request.url);

    if (pathname === "/dom/main.js") {
      return serveFile(request, "package/esm/dom/main.js");
    }

    if (pathname === "/components/counter.js") {
      return serveFile(request, "package/esm/components/counter.js");
    }

    if (pathname === "/templates/button.css") {
      return serveFile(request, "templates/button.css");
    }

    if (pathname === "/components/button.js") {
      return serveFile(request, "package/esm/components/button.js");
    }

    if (pathname === "/elements/dsd-button.js") {
      return serveFile(request, "package/esm/elements/dsd-button.js");
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
          <script type="module" src="/dom/main.js"></script>
        </head>
        <body>
          <main>
            <h1>Declarative Shadow DOM</h1>
            <section>
              <h2>Button</h2>
              <Button />
            </section>
            <section>
              <h2>Declarative Shadow DOM Button</h2>
              <DSDButton />
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
