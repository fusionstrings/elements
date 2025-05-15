import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { hydrate, render } from "preact";
import { Button } from "../components/button.js";
import { count } from "../signals/counter.js";
class ButtonPreact extends HTMLElement {
    static observedAttributes = []; // Add attribute names if needed
    shadow = null;
    internals;
    constructor() {
        super();
        if ("attachInternals" in this) {
            this.internals = this.attachInternals();
        }
    }
    handleClick() {
        count.value++;
    }
    connectedCallback() {
        this.shadow = this.internals?.shadowRoot || this.shadowRoot;
        if (!this.shadow) {
            this.shadow = this.attachShadow({ mode: "open", serializable: true });
            render(_jsxs(_Fragment, { children: [_jsx("link", { rel: "stylesheet", href: "/templates/button.css" }), _jsx(Button, { onClick: this.handleClick })] }), this.shadow);
        }
        else {
            hydrate(_jsx(Button, { onClick: this.handleClick }), this.shadow);
        }
    }
    disconnectedCallback() {
        if (this.shadow) {
            render(null, this.shadow);
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name);
        console.log(oldValue);
        console.log(newValue);
    }
}
export { ButtonPreact };
