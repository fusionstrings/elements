import { jsx as _jsx } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { renderToReadableStream } from "preact-render-to-string/stream";
import { serveFile } from "@std/http/file-server";
import { Document } from "./components/document.js";
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
        pattern: new URLPattern({ pathname: "/dom/main.js" }),
        file: "bundle/main.js",
    },
    {
        pattern: new URLPattern({ pathname: "/components/button.css" }),
        file: "components/button.css",
    },
    {
        pattern: new URLPattern({ pathname: "/components/counter.css" }),
        file: "components/counter.css",
    },
];
function document() {
    const stream = renderToReadableStream(_jsx(Document, {}));
    const encoder = new TextEncoder();
    return stream.pipeThrough(new TransformStream({
        start(controller) {
            controller.enqueue(encoder.encode("<!DOCTYPE html>"));
        }
    }));
}
export default {
    fetch(request) {
        const { pathname } = new URL(request.url);
        for (const route of routes) {
            if (route.pattern.test({ pathname })) {
                return serveFile(request, route.file);
            }
        }
        const stream = document();
        return new Response(stream, {
            headers: {
                "content-type": "text/html;charset=UTF-8",
            },
        });
    },
};
export { document };
