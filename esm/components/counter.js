/** @jsxImportSource preact */ import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { count } from "#signals/counter";
function Counter(_) {
  return /*#__PURE__*/ _jsxs(_Fragment, {
    children: [
      /*#__PURE__*/ _jsx("link", {
        rel: "stylesheet",
        href: "/components/counter.css"
      }),
      /*#__PURE__*/ _jsx("div", {
        children: count
      })
    ]
  });
}
export { Counter };
