import { jsx as _jsx } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { TemplateCounter } from "../templates/template-counter.js";
function DSDCounter() {
    return (_jsx("dsd-counter-preact", { children: _jsx(TemplateCounter, { shadowrootmode: "open", shadowrootserializable: true }) }));
}
export { DSDCounter };
