/** @jsxImportSource preact */
import { Button } from "#button";
function DSDButton(
  { label }: {
    label: string;
  },
) {
  return (
    <dsd-button-preact>
      <template shadowrootmode="open">
        <Button />
      </template>
      {label}
    </dsd-button-preact>
  );
}

export { DSDButton };
