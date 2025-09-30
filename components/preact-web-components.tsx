/** @jsxImportSource preact */

import { Button } from "#components/button";
import { Counter } from "#components/counter";
import { Document, type DocumentProps } from "#document";
function PreactWebComponentsDocument({ importMap, scriptContents }: DocumentProps) {
    return (
        <Document
            importMap={importMap}
            title="Preact Web Components"
            scriptContents={scriptContents}
        >
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/standard-web-components">Standard Web Components</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>Preact Web Components Study</h1>

                <form onSubmit={(event) => event.preventDefault()}>
                    <fieldset>
                        <legend>Counter Form</legend>
                        <p>
                            Current count: <element-counter hydrate>
                                <template shadowrootmode="open"><Counter>0</Counter></template>
                            </element-counter>
                        </p>
                        <element-button hydrate><template shadowrootmode="open"><Button>Increment</Button></template>Add</element-button>
                    </fieldset>
                </form>
            </main>
        </Document>
    )
}

export { PreactWebComponentsDocument }