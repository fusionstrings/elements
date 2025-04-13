/** @jsxImportSource preact */

import { hydrate, render } from "preact";
import { Counter } from "#counter";
class CounterPreact extends HTMLElement {
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
          <link rel="stylesheet" href="/templates/counter.css" />
          <Counter />
        </>,
        shadow,
      );
    } else {
      hydrate(<Counter />, shadow);
    }
  }
}

export { CounterPreact };
