import { Parser } from 'https://deno.land/x/eszip@v0.84.0/mod.ts';
async function main() {

    const parser = await Parser.createInstance();
    const specifiers = await parser.parseBytes(eszip);
    await parser.load();
    const specifiers1 = await parser.getModuleSource(specifiers[1]);
    return eszip;
}

main();