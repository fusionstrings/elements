/** @jsxImportSource preact */

import { hydrate, render } from "preact";
import { Counter } from "#counter";
class DSDCounterPreact extends HTMLElement {
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
      });

      render(<Counter />, shadow);
    } else {
      hydrate(<Counter />, shadow);
    }
  }
}

export { DSDCounterPreact };
