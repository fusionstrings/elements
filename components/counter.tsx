/** @jsxImportSource preact */
import { count } from "#signals/counter";

function Counter() {
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
