import { jsx as _jsx } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { render } from "preact";
import { Counter } from "../components/counter.js";
class DSDButton extends HTMLElement {
    constructor() {
        super();
        const supportsDeclarative = HTMLElement.prototype.hasOwnProperty("attachInternals");
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
            const template = document.getElementById("template-button");
            if (template) {
                shadow.appendChild(template.content.cloneNode(true));
            }
            // shadow.innerHTML = `<button><slot></slot></button>`;
        }
        // in either case, wire up our event listener:
        //shadow.firstElementChild?.addEventListener("click", toggle);
        render(_jsx(Counter, {}), shadow);
    }
}
export { DSDButton };
