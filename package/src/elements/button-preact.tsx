/** @jsxImportSource preact */
import { hydrate, render } from "preact";
import { Button } from "../components/button.js";
import { count } from "../signals/counter.js";
class ButtonPreact extends HTMLElement {
  constructor() {
    super();

    const supportsDeclarative = Object.hasOwn(
      HTMLElement.prototype,
      "attachInternals",
    );
    const internals = supportsDeclarative ? this.attachInternals() : undefined;

    // check for a Declarative Shadow Root.
    let shadow = internals?.shadowRoot;

    if (!shadow) {
      // there wasn't one. create a new Shadow Root:
      shadow = this.attachShadow({
        mode: "open",
        serializable: true,
      });

      render(
        <>
          <link rel="stylesheet" href="/templates/button.css" />
          <Button onClick={() => count.value++} />
        </>,
        shadow,
      );
    } else {
      // in either case, wire up our event listener:
      hydrate(<Button onClick={() => count.value++} />, shadow);
    }
  }
}

export { ButtonPreact };
