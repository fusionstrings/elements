/** @jsxImportSource preact */
import browserImportMap from "../importmap.json" with { type: "json" };
import { TemplateCounter } from "#template-counter";
import { TemplateButton } from "#template-button";
import { Button } from "#button";
import { count } from "#signals/counter";
import { DSDCounter } from "#components/dsd-counter";
import { DSDButton } from "#components/dsd-button";

function Home() {
    return (
        <html lang="en">

            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>DSD</title>

                <script
                    type="importmap"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(browserImportMap, null, 2),
                    }}
                />
                <TemplateCounter id="template-counter" />
                <TemplateButton id="template-button" />
                <script type="module" src="./esm/dom/main.js"></script>
            </head>
            <body>
                <header>
                    <nav>
                        <ul>
                            <li><a href="/elements">Elements</a></li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <h1>Declarative Shadow DOM study</h1>

                    <section>
                        <h2>Button Element</h2>
                        <button type="button">Count</button>
                    </section>

                    <section>
                        <h2>Button Component</h2>
                        <template shadowrootmode="open">
                            <Button />
                        </template>
                    </section>

                    <section>
                        <h2>Button Custom Element</h2>
                        <element-counter>{count}</element-counter>
                        <element-button>Count</element-button>
                    </section>

                    <section>
                        <h2>Button Custom Element (Preact)</h2>
                        <dsd-counter-preact>{count}</dsd-counter-preact>
                        <dsd-button-preact>Count</dsd-button-preact>
                    </section>

                    <section>
                        <h2>Button Component with Declarative Shadow DOM (Preact)</h2>
                        <DSDCounter />
                        <DSDButton label="Count" />
                    </section>

                    <section>
                        <h2>Preact register</h2>
                        <element-counter2>{count}</element-counter2>
                        <element-button2>Count</element-button2>
                    </section>
                </main>
            </body>
        </html>
    )
}

export { Home }