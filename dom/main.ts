import { DSDCounter } from "#elements/dsd-counter";
import { DSDButton } from "#elements/dsd-button";

function main() {
    customElements.define("dsd-counter", DSDCounter);
    customElements.define("dsd-button", DSDButton);
}

document.addEventListener("DOMContentLoaded", main)