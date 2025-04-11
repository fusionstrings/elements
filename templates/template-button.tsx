/** @jsxImportSource preact */
import { Button } from "#button";
function TemplateButton(
  { shadowrootmode, id }: { shadowrootmode?: "open" | "closed"; id?: string },
) {
  return (
    <template shadowrootmode={shadowrootmode} id={id}>
      <link rel="stylesheet" href="/templates/button.css" />
      <Button />
    </template>
  );
}

export { TemplateButton };
