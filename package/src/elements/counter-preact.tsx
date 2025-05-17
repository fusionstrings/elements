/** @jsxImportSource preact */

import { hydrate, render } from "preact";
import { Counter } from "../components/counter.js";

class CounterPreact extends HTMLElement {

  private shadow: ShadowRoot | null = null;
  private internals?: ElementInternals;

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
      render(
        <>
          <link rel="stylesheet" href="/templates/counter.css" />
          <Counter />
        </>,
        this.shadow,
      );
    } else {
      hydrate(<Counter />, this.shadow);
    }
  }

  disconnectedCallback() {
    if (this.shadow) {
      render(null, this.shadow);
    }
  }
}

export { CounterPreact };
