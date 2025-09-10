/** @jsxImportSource preact */
import { count } from "#signals/counter";
function Counter2({emoji = "⚛️"}: {emoji?: string}) {
  return (
    <div>
      Counter: {count} {emoji}
    </div>
  );
}

export { Counter2 };
