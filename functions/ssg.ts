//import { Generator } from "npm:@jspm/generator";
import { documentHome } from "../main.tsx";

async function ssgHome() {
    const document = await documentHome();

    // const root = new URL("../package", import.meta.url)
    // console.log(root);
    // console.log(import.meta.url);
    // const generator = new Generator({
    //     mapUrl: root,
    //     env: ['production', 'module', 'browser'],
    // });
    // const documentWithImportmap = await generator.htmlInject(document, {
    //     trace: true,
    //     esModuleShims: true,
    //     preload: true,
    //     integrity: true,
    //     //rootUrl: root,//new URL("../package", import.meta.url),
    //     htmlUrl: root,
    // })
    //console.log(documentWithImportmap);

    // await generator.link(document);
    // console.log(JSON.stringify(generator.getMap(), null, 2));
    await Deno.writeTextFile("package/index.html", document);
}

export { ssgHome }

if (import.meta.main) {
    await ssgHome();
    console.log("package/index.html generated");
}