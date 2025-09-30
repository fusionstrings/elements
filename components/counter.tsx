/** @jsxImportSource preact */
import { count } from "#signals/counter";
import type { ComponentChildren } from "preact";

type CounterProps = {
  children?: ComponentChildren;
};


function Counter(_: CounterProps) {
  return (
    <>
      <link rel="stylesheet" href="/components/counter.css" />
      <div>
        {count}
      </div>
    </>
  );
}

export { Counter };
