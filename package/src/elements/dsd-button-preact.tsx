/** @jsxImportSource preact */
import { hydrate, render } from "preact";
import { Button } from "../components/button.js";
import { count } from "../signals/counter.js";
//import { TemplateButton } from "#template-button";
class DSDButtonPreact extends HTMLElement {
  constructor() {
    super();

    const supportsDeclarative = Object.hasOwn(
      HTMLElement.prototype,
      "attachInternals",
    );
    const internals = supportsDeclarative ? this.attachInternals() : undefined;

    // const toggle = () => {
    //   console.log("menu toggled!");
    // };

    // check for a Declarative Shadow Root.
    let shadow = internals?.shadowRoot;

    if (!shadow) {
      // there wasn't one. create a new Shadow Root:
      shadow = this.attachShadow({
        mode: "open",
      });

      // const template = document.getElementById(
      //   "template-button",
      // ) as HTMLTemplateElement | null;

      // if (template) {
      //   shadow.appendChild(template.content.cloneNode(true));
      // }
      // shadow.innerHTML = `<button><slot></slot></button>`;
      render(<Button onClick={() => count.value++} />, shadow);
    } else {
      // in either case, wire up our event listener:
      //shadow.firstElementChild?.addEventListener("click", toggle);
      hydrate(<Button onClick={() => count.value++} />, shadow);
    }
  }
}

export { DSDButtonPreact };
