import { effect } from "@preact/signals";
import { count } from "../signals/counter.js";

class DSDCounter extends HTMLElement {
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

      const template = document.getElementById(
        "template-counter",
      ) as HTMLTemplateElement | null;

      if (template) {
        shadow.appendChild(template.content.cloneNode(true));
      }
    }
    const counterElement = shadow.firstElementChild;
    if (counterElement) {
      effect(() => {
        counterElement.textContent = `${count.value}`;
      });

    }
  }
}

export { DSDCounter };
