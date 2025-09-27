/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import { count } from "../signals/counter.js";

function Button(
  { children = "Increment" }: {
    children?: ComponentChildren;
  },
) {
  const handleClick = () => {
    count.value++;
  };

  return (
    <>
      <link rel="stylesheet" href="/components/button.css" />
      <button type="button" onClick={handleClick}>
        {children}
      </button>
    </>
  );
}

export { Button };
