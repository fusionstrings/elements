import { build, emptyDir } from '@deno/dnt';

const OUT_DIR = './package';

await emptyDir(OUT_DIR);

await build({
    entryPoints: ['dom/main.ts'],
    outDir: OUT_DIR,
    shims: {
        // see JS docs for overview and more options
        deno: true,
    },
    scriptModule: false,
    esModule: true,
    skipSourceOutput: false,
    importMap: 'deno.json',
    typeCheck: false,
    compilerOptions: {
        lib: ['ESNext', 'DOM', 'DOM.Iterable'],
        target: 'Latest',

    },
    package: {
        // package.json properties
        name: '@fusionstrings/dnt',
        version: Deno.args[0],
        dependencies: {
            "preact-render-to-string": "5.1.20",
            preact: "10.26.5",
            "@preact/signals": "2.0.3",
        }
    },
    postBuild() {
        console.log('done');
        // steps to run after building and before running the tests
        // Deno.copyFileSync("LICENSE", "npm/LICENSE");
        // Deno.copyFileSync("README.md", "npm/README.md");
    },
});