import { Window } from "happy-dom";

const globals = new Window();

global.document = globals.document;
global.customElements = globals.customElements;
global.HTMLElement = globals.HTMLElement;

export async function render(html: string, imports: Array<() => Promise<unknown>> = []) {
  await Promise.all(imports.map((init) => init()));

  document.documentElement.innerHTML = html;
  return document.documentElement.getHTML({ serializableShadowRoots: true });
}

const html = `<!doctype html>
<html lang="en">
  <body>
    <greet-person name="Jake">ok</greet-person>
    <greet-person-shadow>Jane</greet-person-shadow>
  </body>
</html>
`;



export default {
  async fetch() {
    const markup = await render(html, [
      () => import("./elements/greet.js")
    ]);

    return new Response(markup, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};