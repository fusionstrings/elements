/** @jsxImportSource preact */
import { count } from "#signals/counter";
function Counter() {
  return (
    <div>
      {count}
    </div>
  );
}

export { Counter };
