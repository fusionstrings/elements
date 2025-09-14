/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";

function Button(
  { onClick, children = "Click Me !" }: {
    onClick?: (event: MouseEvent) => void;
    children?: ComponentChildren;
  },
) {
  return (
    <>
      <link rel="stylesheet" href="/components/button.css" />
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </>
  );
}

export { Button };
