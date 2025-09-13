/** @jsxImportSource preact */
import { Button } from "#button";
function TemplateButton(
  { shadowrootmode, id, shadowrootserializable }: { shadowrootmode?: "open" | "closed"; id?: string, shadowrootserializable?: boolean },
) {
  return (
    <>
      <link rel="stylesheet" href="/templates/button.css" />
      <Button />
    </>
  );
}

export { TemplateButton };
