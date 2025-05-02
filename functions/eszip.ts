import { build, Parser } from 'https://deno.land/x/eszip@v0.84.0/mod.ts';

//const importmapURL =
//	'https://raw.githubusercontent.com/fusionstrings/fusionstrings/refs/heads/creation/deno.json';
//'https://raw.githubusercontent.com/fusionstrings/fusionstrings/refs/heads/creation/package/src/dom/home.ts'
//const mod = 'server.ts'
const path = new URL('../dom/main.ts', import.meta.url).href;
console.log(path);
const importmap = new URL('../deno.json', import.meta.url).href;
async function main() {
    const eszip = await build([path], undefined, importmap);
    await Deno.writeFile(`package/esm/dom/main.ts.eszip2`, eszip);

    const parser = await Parser.createInstance();
    const specifiers = await parser.parseBytes(eszip);
    await parser.load();
    
    const sources = new Map<string, string>();
    for (const specifier of specifiers.sort()) {
        sources.set(specifier, await parser.getModuleSource(specifier));
    }
    return eszip;
}

main();