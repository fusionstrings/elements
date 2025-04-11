/** @jsxImportSource preact */
import { signal } from "@preact/signals";
import { Button } from "#button";

const count = signal(0);

function Counter() {
  return (
    <>
      <pre>
        {count}
      </pre>
      <Button onClick={() => count.value++} />
    </>
  );
}

export { Counter };
