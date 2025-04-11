import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
/** @jsxImportSource preact */
import { signal } from "@preact/signals";
import { Button } from "./button.js";
const count = signal(0);
function Counter() {
    return (_jsxs(_Fragment, { children: [_jsx("pre", { children: count }), _jsx(Button, { onClick: () => count.value++ })] }));
}
export { Counter };
