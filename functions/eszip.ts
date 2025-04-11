import { build, Parser } from 'https://deno.land/x/eszip@v0.84.0/mod.ts';

//const importmapURL =
//	'https://raw.githubusercontent.com/fusionstrings/fusionstrings/refs/heads/creation/deno.json';
//'https://raw.githubusercontent.com/fusionstrings/fusionstrings/refs/heads/creation/package/src/dom/home.ts'
//const mod = 'server.ts'
const path = new URL('./components/button.tsx', import.meta.url).href;
console.log(path);
const importmap = new URL('./deno.json', import.meta.url).href;
async function main() {
    const eszip = await build([path], undefined, importmap);
    await Deno.writeFile('mod.eszip2', eszip);

    const parser = await Parser.createInstance();
    const specifiers = await parser.parseBytes(eszip);
    await parser.load();
    const specifiers1 = await parser.getModuleSource(specifiers[1]);
    return eszip;
}

main();