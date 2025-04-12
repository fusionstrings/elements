import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
function Button({ onClick, children = "Click Me !" }) {
    return (_jsxs(_Fragment, { children: [_jsx("link", { rel: "stylesheet", href: "/templates/button.css" }), _jsx("button", { type: "button", onClick: onClick, children: _jsx("slot", { children: children }) })] }));
}
export { Button };
