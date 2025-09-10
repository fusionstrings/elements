import { jsx as _jsx } from "preact/jsx-runtime";
function Button2({ onClick, children = "Click Me !" }) {
    return (_jsx("button", { type: "button", onClick: onClick, children: children }));
}
export { Button2 };
