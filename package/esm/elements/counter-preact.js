import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { hydrate, render } from "preact";
import { Counter } from "../components/counter.js";
class CounterPreact extends HTMLElement {
    shadow = null;
    internals;
    constructor() {
        super();
        if ("attachInternals" in this) {
            this.internals = this.attachInternals();
        }
    }
    connectedCallback() {
        this.shadow = this.internals?.shadowRoot || this.shadowRoot;
        if (!this.shadow) {
            this.shadow = this.attachShadow({ mode: "open", serializable: true });
            render(_jsxs(_Fragment, { children: [_jsx("link", { rel: "stylesheet", href: "/templates/counter.css" }), _jsx(Counter, {})] }), this.shadow);
        }
        else {
            hydrate(_jsx(Counter, {}), this.shadow);
        }
    }
    disconnectedCallback() {
        if (this.shadow) {
            render(null, this.shadow);
        }
    }
}
export { CounterPreact };
