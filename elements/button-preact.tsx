/** @jsxImportSource preact */
import { hydrate, render } from "preact";
import { Button } from "#button";
import { count } from "#signals/counter";
class ButtonPreact extends HTMLElement {
  static observedAttributes = []; // Add attribute names if needed

  private shadow: ShadowRoot | null = null;
  private internals?: ElementInternals;

  constructor() {
    super();
    if ("attachInternals" in this) {
      this.internals = this.attachInternals();
    }
  }

  private handleClick() {
    count.value++;
  }

  connectedCallback() {
    this.shadow = this.internals?.shadowRoot || this.shadowRoot;
    if (!this.shadow) {
      this.shadow = this.attachShadow({ mode: "open", serializable: true });
      render(
        <>
          <link rel="stylesheet" href="/templates/button.css" />
          <Button onClick={this.handleClick} />
        </>,
        this.shadow,
      );
    } else {
      hydrate(<Button onClick={this.handleClick} />, this.shadow);
    }
  }

  disconnectedCallback() {
    if (this.shadow) {
      render(null, this.shadow);
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log(name)
    console.log(oldValue)
    console.log(newValue)
  }
}

export { ButtonPreact };
