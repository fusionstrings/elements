import { effect } from "@preact/signals";
import { count } from "../signals/counter.js";

class Counter extends HTMLElement {
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

      const template = document.getElementById(
        "template-counter",
      ) as HTMLTemplateElement | null;

      if (template) {
        shadow.appendChild(template.content.cloneNode(true));
      }
    }

    const counterPlaceholder = shadow.querySelector("div");
    if (counterPlaceholder) {
      effect(() => {
        counterPlaceholder.textContent = `${count.value}`;
      });

    }
  }
}

export { Counter };
