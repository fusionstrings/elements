import { build, emptyDir } from '@deno/dnt';
import { ensureDir } from "jsr:@std/fs/ensure-dir";
import { ssgHome } from './ssg.ts';
const OUT_DIR = './package';

await emptyDir(OUT_DIR);

await build({
    entryPoints: ['main.tsx', { name: "./dom/main", path: "./dom/main.ts" }],
    outDir: OUT_DIR,
    shims: {
        // see JS docs for overview and more options
        deno: true,
    },
    scriptModule: false,
    typeCheck: false,
    test: false,
    esModule: true,
    skipSourceOutput: false,
    importMap: 'deno.json',
    compilerOptions: {
        lib: ['ESNext', 'DOM', 'DOM.Iterable'],
        target: 'Latest',

    },
    package: {
        // package.json properties
        name: '@fusionstrings/elements',
        version: Deno.args[0],
        type: 'module',
    },
    async postBuild() {
        // const command = new Deno.Command(Deno.execPath(), {
        //     args: [
        //         "info",
        //         "console.log('hello'); console.error('world')",
        //     ],
        // });
        // const command = new Deno.Command('zsh', {
        //     args: [
        //         'ls',
        //     ],
        //     cwd: OUT_DIR,
        // });
        //await Deno.rename(`${OUT_DIR}/test_runner.js`, `${OUT_DIR}/test-runner.cjs`);
        await ssgHome();
        console.log('ssgHome done');

        await ensureDir(`${OUT_DIR}/templates`);
        Deno.copyFileSync("templates/button.css", `${OUT_DIR}/templates/button.css`);
        Deno.copyFileSync("templates/counter.css", `${OUT_DIR}/templates/counter.css`);
        const { config } = await import('#wrangler-config');
        await Deno.writeTextFile(`${OUT_DIR}/wrangler.jsonc`, JSON.stringify(config, null, 2));
        // deno run -A npm:vite build
        const command = new Deno.Command(Deno.execPath(), {
            args: [
                'run',
                '-A',
                // '--allow-read',
                // '--allow-ffi',
                // '--allow-env',
                // '--allow-sys',
                'npm:vite',
                'build',
            ],
            cwd: OUT_DIR,
        });
        const { code, stdout, stderr } = await command.output();
        console.log('code', code);
        console.assert(code === 0);
        console.log(new TextDecoder().decode(stdout));
        console.log(new TextDecoder().decode(stderr));

        console.log('Vite done');

        const commandJSPM = new Deno.Command(Deno.execPath(), {
            args: [
                'run',
                '-A',
                // '--allow-read',
                // '--allow-ffi',
                // '--allow-env',
                // '--allow-sys',
                'npm:jspm',
                'link',
                '--map',
                'index.html',
                '--integrity',
                '--preload'
            ],
            cwd: OUT_DIR,
        });

        const { code: codeJSPM, stdout: stdoutJSPM, stderr: stderrJSPM } = await commandJSPM.output();
        console.log('code', codeJSPM);
        console.assert(codeJSPM === 0);
        console.log(new TextDecoder().decode(stdoutJSPM));
        console.log(new TextDecoder().decode(stderrJSPM));

        console.log('JSPM done');

        // steps to run after building and before running the tests
        // Deno.copyFileSync("README.md", "npm/README.md");
    },
});