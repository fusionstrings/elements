import { DSDButton } from "../elements/dsd-button.tsx";
function main() {
    customElements.define("dsd-button", DSDButton);
}

document.addEventListener("DOMContentLoaded", main)