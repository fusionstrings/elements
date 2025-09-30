/** @jsxImportSource preact */ import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { count } from "#signals/counter";
function Button({ children = "Increment" }) {
  const handleClick = ()=>{
    count.value++;
  };
  return /*#__PURE__*/ _jsxs(_Fragment, {
    children: [
      /*#__PURE__*/ _jsx("link", {
        rel: "stylesheet",
        href: "/components/button.css"
      }),
      /*#__PURE__*/ _jsx("button", {
        type: "button",
        onClick: handleClick,
        children: children
      })
    ]
  });
}
export { Button };
