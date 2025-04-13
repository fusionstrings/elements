/** @jsxImportSource preact */
import { TemplateButton } from "#template-button";
function DSDButton(
  { label }: {
    label: string;
  },
) {
  return (
    <dsd-button-preact>
      <TemplateButton shadowrootmode="open" />
      {label}
    </dsd-button-preact>
  );
}

export { DSDButton };
