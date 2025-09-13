/** @jsxImportSource preact */
import { TemplateCounter } from "../templates/template-counter.js";
function DSDCounter() {
  return (
    <dsd-counter-preact>
      <TemplateCounter shadowrootmode="open" shadowrootserializable />
    </dsd-counter-preact>
  );
}

export { DSDCounter };
