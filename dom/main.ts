import register from 'preact-custom-element';
import { CounterPreact } from "#elements/counter-preact";
import { ButtonPreact } from "#elements/button-preact";
import { Button2 } from "#components/button2";
import { Counter2 } from "#components/counter2";
import { Counter } from "#elements/counter";
import { Button } from "#elements/button";


function main() {
    customElements.define("dsd-counter-preact", CounterPreact);
    customElements.define("dsd-button-preact", ButtonPreact);
    register(Counter2, 'element-counter2', [], { shadow: true, mode: 'open', adoptedStyleSheets: [counterStyle] });
    register(Button2, 'element-button2', [], { shadow: true, mode: 'open', adoptedStyleSheets: [] });
    customElements.define("element-counter", Counter);
    customElements.define("element-button", Button);
}

document.addEventListener("DOMContentLoaded", main)