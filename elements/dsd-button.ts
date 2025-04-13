import { count } from "#signals/counter";
class DSDButton extends HTMLElement {
  constructor() {
    super();

    const supportsDeclarative = Object.hasOwn(
      HTMLElement.prototype,
      "attachInternals",
    );
    const internals = supportsDeclarative ? this.attachInternals() : undefined;

    const onClick = () => {
      count.value++;
    };

    // check for a Declarative Shadow Root.
    let shadow = internals?.shadowRoot;

    if (!shadow) {
      // there wasn't one. create a new Shadow Root:
      shadow = this.attachShadow({
        mode: "open",
      });

      const template = document.getElementById(
        "template-button",
      ) as HTMLTemplateElement | null;

      if (template) {
        shadow.appendChild(template.content.cloneNode(true));
      }
    }
    // in either case, wire up our event listener:
    const button = shadow.querySelector("button");

    if (button) {
      button.addEventListener("click", onClick);
    }

  }
}

export { DSDButton };
