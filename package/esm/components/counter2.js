import { jsxs as _jsxs } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { count } from "../signals/counter.js";
function Counter2({ emoji = "⚛️" }) {
    return (_jsxs("div", { children: ["Counter: ", count, " ", emoji] }));
}
export { Counter2 };
