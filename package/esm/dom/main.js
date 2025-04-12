import "../_dnt.polyfills.js";
import { DSDCounter } from "../elements/dsd-counter.js";
import { DSDButton } from "../elements/dsd-button.js";
function main() {
    customElements.define("dsd-counter", DSDCounter);
    customElements.define("dsd-button", DSDButton);
}
document.addEventListener("DOMContentLoaded", main);
