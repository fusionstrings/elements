/** @jsxImportSource preact */
import { Counter } from "../components/counter.js";
function TemplateCounter(
  { shadowrootmode, id, shadowrootserializable }: { shadowrootmode?: "open" | "closed"; id?: string, shadowrootserializable?: boolean },
) {
  return (
    <template shadowrootmode={shadowrootmode} id={id} shadowrootserializable={shadowrootserializable}>
      <link rel="stylesheet" href="/templates/counter.css" />
      <Counter />
    </template>
  );
}

export { TemplateCounter };
