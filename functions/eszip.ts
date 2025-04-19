import { build, Parser } from 'https://deno.land/x/eszip@v0.84.0/mod.ts';

//const importmapURL =
//	'https://raw.githubusercontent.com/fusionstrings/fusionstrings/refs/heads/creation/deno.json';
//'https://raw.githubusercontent.com/fusionstrings/fusionstrings/refs/heads/creation/package/src/dom/home.ts'
//const mod = 'server.ts'
const path = new URL('../dom/main.ts', import.meta.url).href;
console.log(path);
const importmap = new URL('../deno.json', import.meta.url).href;
function hasV2Header(bytes: Uint8Array) {
    const magicV2 = new TextDecoder().decode(bytes.slice(0, 8));
    // ESZIP_V2_3_MAGIC
    // https://github.com/denoland/eszip/blob/main/src/v2.rs#L47
    return magicV2 === "ESZIP2.3";//"ESZIP_V2";
}
async function main() {
    const eszip = await build([path], undefined, importmap);
    await Deno.writeFile('mod.eszip2', eszip);

    const parser = await Parser.createInstance();
    const specifiers = await parser.parseBytes(eszip);
    await parser.load();
    const specifiers1 = await parser.getModuleSource(specifiers[1]);

    const sources = new Map<string, string>();
    for (const specifier of specifiers.sort()) {
        sources.set(specifier, await parser.getModuleSource(specifier));
    }
    const isV2 = hasV2Header(eszip);
    return eszip;
}

main();