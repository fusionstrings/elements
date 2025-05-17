import { effect } from "@preact/signals";
import { count } from "../signals/counter.js";
class Counter extends HTMLElement {
    shadow = null;
    internals;
    counterPlaceholder = null;
    disposeEffect;
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
            const template = document.getElementById("template-counter");
            if (template) {
                this.shadow.appendChild(template.content.cloneNode(true));
            }
        }
        this.counterPlaceholder = this.shadow?.querySelector("div");
        if (this.counterPlaceholder) {
            // Store disposer to clean up effect on disconnect
            this.disposeEffect = effect(() => {
                this.counterPlaceholder.textContent = `${count.value}`;
            });
        }
    }
    disconnectedCallback() {
        if (this.disposeEffect) {
            this.disposeEffect();
            this.disposeEffect = undefined;
        }
    }
}
export { Counter };
