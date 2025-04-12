/** @jsxImportSource preact */
import { count } from "../signals/counter.js";
function Counter() {
  return (
    <div>
      {count}
    </div>
  );
}

export { Counter };
