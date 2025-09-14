import register from 'preact-custom-element';
import { Button } from "../components/button.js";
import { Counter } from "../components/counter.js";

function main() {
    register(Counter, 'element-counter', [], { shadow: true, mode: 'open' });
    register(Button, 'element-button', [], { shadow: true, mode: 'open' });
}

document.addEventListener("DOMContentLoaded", main);