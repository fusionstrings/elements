import { DSDButton } from "../elements/dsd-button.js";
function main() {
    customElements.define("dsd-button", DSDButton);
}
document.addEventListener("DOMContentLoaded", main);
