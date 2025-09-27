customElements.define("greet-person", class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open", serializable: true });
    const name = this.getAttribute("name");
    this.shadowRoot.innerHTML = `<p>Hello, <slot></slot>${name}!</p>`;
  }
});

customElements.define("greet-person-shadow", class extends HTMLElement {
  constructor() {
	  super();

    this.attachShadow({ mode: "open", serializable: true });
    this.shadowRoot.innerHTML = "<p>Hello, <slot></slot>!</p>";
  }
});