import "../_dnt.polyfills.js";
import { DSDCounterPreact } from "../elements/dsd-counter-preact.js";
import { DSDButtonPreact } from "../elements/dsd-button-preact.js";
import { DSDCounter } from "../elements/dsd-counter.js";
import { DSDButton } from "../elements/dsd-button.js";
function main() {
    customElements.define("dsd-counter-preact", DSDCounterPreact);
    customElements.define("dsd-button-preact", DSDButtonPreact);
    customElements.define("dsd-counter", DSDCounter);
    customElements.define("dsd-button", DSDButton);
}
document.addEventListener("DOMContentLoaded", main);
