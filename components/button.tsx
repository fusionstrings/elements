/** @jsxImportSource preact */
import type { JSX } from "preact";

function Button(
  { onClick, children = "Click Me !" }: {
    onClick?: JSX.MouseEventHandler<HTMLButtonElement> | undefined;
    children?: JSX.Element | string;
  },
) {
  return (
    <>
      <link rel="stylesheet" href="/templates/button.css" />
      <button type="button" onClick={onClick}>
        <slot>{children}</slot>
      </button>
    </>
  );
}

export { Button };
