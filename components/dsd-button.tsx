/** @jsxImportSource preact */
import { Button } from "#button";
function DSDButton(
  { label }: {
    label: string;
  },
) {
  return (
    <dsd-button>
      <template shadowrootmode="open">
        <Button />
      </template>
      {label}
    </dsd-button>
  );
}

export { DSDButton };
