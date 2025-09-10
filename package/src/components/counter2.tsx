/** @jsxImportSource preact */
import { count } from "../signals/counter.js";
function Counter2({emoji = "⚛️"}: {emoji?: string}) {
  return (
    <div class="counter">
     <span>Counter: {count}</span> <span class="emoji">{emoji}</span>
    </div>
  );
}

export { Counter2 };
