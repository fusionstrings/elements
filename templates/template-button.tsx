/** @jsxImportSource preact */
import { Button } from "#button";
function TemplateButton(
  { shadowrootmode, id }: { shadowrootmode?: "open" | "closed"; id?: string },
) {
  return (
    <template shadowrootmode={shadowrootmode} id={id}>
      <Button />
    </template>
  );
}

export { TemplateButton };
