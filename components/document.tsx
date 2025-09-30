/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';

type InlineImportMap = {
    imports: Record<string, string>;
    scopes?: Record<string, Record<string, string>>;
};
type DocumentProps = {
    importMap?: InlineImportMap;
    scriptContents?: string[];
    title: string;
    head?: ComponentChildren;
    children?: ComponentChildren;
};

function Document({ importMap, scriptContents, title, head, children }: DocumentProps) {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>{title}</title>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                {head}
                {importMap && (
                    <script
                        type="importmap"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(importMap) }}
                    />
                )}
                {scriptContents?.map((content) => (
                    <script
                        type="module"
                        dangerouslySetInnerHTML={{ __html: content }}
                    >
                    </script>
                ))}
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}

export { Document, type DocumentProps };