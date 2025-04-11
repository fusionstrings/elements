import { jsx as _jsx } from "preact/jsx-runtime";
function Button({ onClick, children = "Click Me !" }) {
    return (_jsx("button", { type: "button", onClick: onClick, children: _jsx("slot", { children: children }) }));
}
export { Button };
