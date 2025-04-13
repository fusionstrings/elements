import { CounterPreact } from "#elements/counter-preact";
import { ButtonPreact } from "#elements/button-preact";
import { Counter } from "#elements/counter";
import { Button } from "#elements/button";

function main() {
    customElements.define("dsd-counter-preact", CounterPreact);
    customElements.define("dsd-button-preact", ButtonPreact);
    customElements.define("element-counter", Counter);
    customElements.define("element-button", Button);
}

document.addEventListener("DOMContentLoaded", main)