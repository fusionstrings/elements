/** @jsxImportSource preact */
import type { JSX } from "preact";
function Button(
  { onClick, children = "Click Me !" }: {
    onClick?: JSX.MouseEventHandler<HTMLButtonElement> | undefined;
    children?: JSX.Element | string;
  },
) {
  return (
    <button type="button" onClick={onClick}>
      <slot>{children}</slot>
    </button>
  );
}

export { Button };
