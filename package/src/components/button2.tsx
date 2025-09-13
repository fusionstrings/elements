/** @jsxImportSource preact */
import type { JSX } from "preact";

function Button2(
  { onClick, children = "Click Me !" }: {
    onClick?: JSX.MouseEventHandler<HTMLButtonElement> | undefined;
    children?: JSX.Element | string;
  },
) {
  return (
    <>
      <link rel="stylesheet" href="/esm/dom/button2.css" />
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </>
  );
}

export { Button2 };
