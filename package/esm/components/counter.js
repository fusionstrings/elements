import { jsx as _jsx } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { count } from "../signals/counter.js";
function Counter() {
    return (_jsx("div", { children: count }));
}
export { Counter };
