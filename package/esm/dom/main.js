import register from 'preact-custom-element';
import { CounterPreact } from "../elements/counter-preact.js";
import { ButtonPreact } from "../elements/button-preact.js";
import { Button2 } from "../components/button2.js";
import { Counter2 } from "../components/counter2.js";
import { Counter } from "../elements/counter.js";
import { Button } from "../elements/button.js";


import counterStyle from './counter2.css' with { type: 'css' };
const sheet = new CSSStyleSheet();
		sheet.replaceSync('button { color: red; background: green; }');

function main() {
    customElements.define("dsd-counter-preact", CounterPreact);
    customElements.define("dsd-button-preact", ButtonPreact);
    register(Counter2, 'element-counter2', [], { shadow: true, mode: 'open', adoptedStyleSheets: [counterStyle] });
    register(Button2, 'element-button2', [], { shadow: true, mode: 'open', adoptedStyleSheets: [sheet] });
    customElements.define("element-counter", Counter);
    customElements.define("element-button", Button);
}
document.addEventListener("DOMContentLoaded", main);
