/** @jsxImportSource preact */
import { Button } from "#button";
function TemplateButton(
  { shadowrootmode, id, shadowrootserializable }: { shadowrootmode?: "open" | "closed"; id?: string, shadowrootserializable?: boolean },
) {
  return (
    <template shadowrootmode={shadowrootmode} id={id} shadowrootserializable={shadowrootserializable}>
      <link rel="stylesheet" href="/templates/button.css" />
      <Button />
    </template>
  );
}

export { TemplateButton };
