import { jsx as _jsx } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { hydrate, render } from "preact";
import { Counter } from "../components/counter.js";
class DSDCounterPreact extends HTMLElement {
    constructor() {
        super();
        const supportsDeclarative = Object.hasOwn(HTMLElement.prototype, "attachInternals");
        const internals = supportsDeclarative ? this.attachInternals() : undefined;
        // check for a Declarative Shadow Root.
        let shadow = internals?.shadowRoot;
        if (!shadow) {
            // there wasn't one. create a new Shadow Root:
            shadow = this.attachShadow({
                mode: "open",
            });
            render(_jsx(Counter, {}), shadow);
        }
        else {
            hydrate(_jsx(Counter, {}), shadow);
        }
    }
}
export { DSDCounterPreact };
