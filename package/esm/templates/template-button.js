import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { Button } from "../components/button.js";
function TemplateButton({ shadowrootmode, id, shadowrootserializable }) {
    return (_jsxs("template", { shadowrootmode: shadowrootmode, id: id, shadowrootserializable: shadowrootserializable, children: [_jsx("link", { rel: "stylesheet", href: "/templates/button.css" }), _jsx(Button, {})] }));
}
export { TemplateButton };
