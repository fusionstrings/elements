/** @jsxImportSource preact */
import { renderToReadableStream } from "preact-render-to-string/stream";
import { serveFile } from "@std/http/file-server";
import { Home } from "#home";

const routes = [
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
    pattern: new URLPattern({ pathname: "/standard-web-components" }),
    file: "standard-web-components.html",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/dom/main.js" }),
    file: "package/esm/dom/main.js",
  },
];

function documentHome(): ReadableStream<Uint8Array> {
  const stream = renderToReadableStream(<Home />);
  const encoder = new TextEncoder();
  
  return stream.pipeThrough(new TransformStream({
    start(controller) {
      controller.enqueue(encoder.encode("<!DOCTYPE html>"));
    }
  }));
}

export default {
  fetch(request: Request) {
    const { pathname } = new URL(request.url);

    for (const route of routes) {
      if (route.pattern.test({ pathname })) {
        return serveFile(request, route.file);
      }
    }

    const stream = documentHome();
    return new Response(stream, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};

export { documentHome }