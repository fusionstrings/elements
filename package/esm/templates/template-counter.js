import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { Counter } from "../components/counter.js";
function TemplateCounter({ shadowrootmode, id, shadowrootserializable }) {
    return (_jsxs("template", { shadowrootmode: shadowrootmode, id: id, shadowrootserializable: shadowrootserializable, children: [_jsx("link", { rel: "stylesheet", href: "/templates/counter.css" }), _jsx(Counter, {})] }));
}
export { TemplateCounter };
