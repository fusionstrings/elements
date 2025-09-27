import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { count } from "../signals/counter.js";
function Button({ children = "Increment" }) {
    const handleClick = () => {
        count.value++;
    };
    return (_jsxs(_Fragment, { children: [_jsx("link", { rel: "stylesheet", href: "/components/button.css" }), _jsx("button", { type: "button", onClick: handleClick, children: children })] }));
}
export { Button };
