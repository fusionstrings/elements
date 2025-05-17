import { CounterPreact } from "../elements/counter-preact.js";
import { ButtonPreact } from "../elements/button-preact.js";
import { Counter } from "../elements/counter.js";
import { Button } from "../elements/button.js";
function main() {
    customElements.define("dsd-counter-preact", CounterPreact);
    customElements.define("dsd-button-preact", ButtonPreact);
    customElements.define("element-counter", Counter);
    customElements.define("element-button", Button);
}
document.addEventListener("DOMContentLoaded", main);
