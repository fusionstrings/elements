/** @jsxImportSource preact */
import { Counter } from "#counter";
function TemplateCounter(
  { shadowrootmode, id }: { shadowrootmode?: "open" | "closed"; id?: string },
) {
  return (
    <template shadowrootmode={shadowrootmode} id={id}>
      <Counter />
    </template>
  );
}

export { TemplateCounter };
