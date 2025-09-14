import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { count } from "../signals/counter.js";
function Counter() {
    return (_jsxs(_Fragment, { children: [_jsx("link", { rel: "stylesheet", href: "/components/counter.css" }), _jsx("div", { children: count })] }));
}
export { Counter };
