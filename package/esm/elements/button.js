import { count } from "../signals/counter.js";
class Button extends HTMLElement {
    shadow = null;
    internals;
    buttonEl = null;
    handleClick = () => {
        count.value++;
    };
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
            const template = document.getElementById("template-button");
            if (template) {
                this.shadow.appendChild(template.content.cloneNode(true));
            }
        }
        // Attach event listener
        this.buttonEl = this.shadow?.querySelector("button");
        if (this.buttonEl) {
            this.buttonEl.addEventListener("click", this.handleClick);
        }
    }
    disconnectedCallback() {
        if (this.buttonEl) {
            this.buttonEl.removeEventListener("click", this.handleClick);
        }
    }
}
export { Button };
