/** @jsxImportSource preact */
import { renderToString } from "preact-render-to-string";
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
    pattern: new URLPattern({ pathname: "/site.webmanifest" }),
    file: "images/favicon/site.webmanifest",
  },
  {
    pattern: new URLPattern({ pathname: "/esm/dom/main.js" }),
    file: "package/esm/dom/main.js",
  },
];

// Cache the HTML template
let htmlTemplate: string;

async function loadTemplate(): Promise<string> {
  if (!htmlTemplate) {
    htmlTemplate = await Deno.readTextFile("./template.html");
  }
  return htmlTemplate;
}

function documentHome(): ReadableStream<Uint8Array> {
  const bodyContent = renderToString(<Home />);
  
  // Generate dynamic content
  const replacements = {
    "{{TITLE}}": "Elements - Preact Components",
    "{{DESCRIPTION}}": "Streaming HTML with lol-html and Preact SSR",
    "{{HEAD_CONTENT}}": `<style>body { margin: 0; padding: 20px; font-family: system-ui; }</style>`,
    "{{BODY_CONTENT}}": bodyContent
  };

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const template = await loadTemplate();
        
        // Simple string replacement approach for now
        // (lol-html API seems complex in Deno environment)
        let processedHtml = template;
        for (const [placeholder, value] of Object.entries(replacements)) {
          processedHtml = processedHtml.replaceAll(placeholder, value);
        }
        
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(processedHtml));
        controller.close();
        
      } catch (error) {
        console.error("Error in documentHome:", error);
        controller.error(error);
      }
    }
  });
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