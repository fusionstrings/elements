import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import browserImportMap from "../importmap.js";
import { TemplateCounter } from "../templates/template-counter.js";
import { TemplateButton } from "../templates/template-button.js";
import { Button } from "./button.js";
import { count } from "../signals/counter.js";
import { DSDCounter } from "./dsd-counter.js";
import { DSDButton } from "./dsd-button.js";
function Home() {
    return (_jsxs("html", { lang: "en", children: [_jsxs("head", { children: [_jsx("meta", { charset: "UTF-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }), _jsx("title", { children: "DSD" }), _jsx("script", { type: "importmap", dangerouslySetInnerHTML: {
                            __html: JSON.stringify(browserImportMap, null, 2),
                        } }), _jsx(TemplateCounter, { id: "template-counter" }), _jsx(TemplateButton, { id: "template-button" }), _jsx("script", { type: "module", src: "./esm/dom/main.js" })] }), _jsxs("body", { children: [_jsx("header", { children: _jsx("nav", { children: _jsx("ul", { children: _jsx("li", { children: _jsx("a", { href: "/elements", children: "Elements" }) }) }) }) }), _jsxs("main", { children: [_jsx("h1", { children: "Declarative Shadow DOM study" }), _jsxs("section", { children: [_jsx("h2", { children: "Button Element" }), _jsx("button", { type: "button", children: "Count" })] }), _jsxs("section", { children: [_jsx("h2", { children: "Button Component" }), _jsx("template", { shadowrootmode: "open", children: _jsx(Button, {}) })] }), _jsxs("section", { children: [_jsx("h2", { children: "Button Custom Element" }), _jsx("element-counter", { children: count }), _jsx("element-button", { children: "Count" })] }), _jsxs("section", { children: [_jsx("h2", { children: "Button Custom Element (Preact)" }), _jsx("dsd-counter-preact", { children: count }), _jsx("dsd-button-preact", { children: "Count" })] }), _jsxs("section", { children: [_jsx("h2", { children: "Button Component with Declarative Shadow DOM (Preact)" }), _jsx(DSDCounter, {}), _jsx(DSDButton, { label: "Count" })] }), _jsxs("section", { children: [_jsx("h2", { children: "Preact register" }), _jsx("element-counter2", { children: count }), _jsx("element-button2", { children: "Count" })] })] })] })] }));
}
export { Home };
