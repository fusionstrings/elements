import { jsxs as _jsxs, jsx as _jsx } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { count } from "../signals/counter.js";
function Counter2({ emoji = "⚛️" }) {
    return (_jsxs("div", { class: "counter", children: [_jsxs("span", { children: ["Counter: ", count] }), " ", _jsx("span", { class: "emoji", children: emoji })] }));
}
export { Counter2 };
