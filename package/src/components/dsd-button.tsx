/** @jsxImportSource preact */
import { TemplateButton } from "../templates/template-button.js";
function DSDButton(
  { label }: {
    label: string;
  },
) {
  return (
    <dsd-button-preact>
      <TemplateButton shadowrootmode="open" shadowrootserializable />
      {label}
    </dsd-button-preact>
  );
}

export { DSDButton };
