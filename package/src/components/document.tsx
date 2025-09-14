/** @jsxImportSource preact */

import { Button } from "./button.js";
import { Counter } from "./counter.js";

function Document() {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Elements</title>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <script type="module" src="/dom/main.js"></script>
            </head>
            <body>
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
                                Current count: <element-counter initial-count={0}>
                                    <template shadowrootmode="open"><Counter /></template>
                                </element-counter>
                            </p>
                            <element-button><template shadowrootmode="open"><Button>Increment</Button></template>Add</element-button>
                        </fieldset>
                    </form>
                </main>
            </body>
        </html>
    )
}

export { Document }