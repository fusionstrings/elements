import { DSDCounterPreact } from "#elements/dsd-counter-preact";
import { DSDButtonPreact } from "#elements/dsd-button-preact";
import { DSDCounter } from "#elements/dsd-counter";
import { DSDButton } from "#elements/dsd-button";
function main() {
    customElements.define("dsd-counter-preact", DSDCounterPreact);
    customElements.define("dsd-button-preact", DSDButtonPreact);
    customElements.define("dsd-counter", DSDCounter);
    customElements.define("dsd-button", DSDButton);
}

document.addEventListener("DOMContentLoaded", main)