import { count } from "../signals/counter.js";

class Button extends HTMLElement {
  private shadow: ShadowRoot | null = null;
  private internals?: ElementInternals;
  private buttonEl: HTMLButtonElement | null = null;
  private handleClick = () => {
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

      const template = document.getElementById(
        "template-button",
      ) as HTMLTemplateElement | null;

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