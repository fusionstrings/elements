//import { Generator } from "npm:@jspm/generator";
import { document } from "../main.tsx";

async function ssgDocument() {
    const documentStream = document();
    const documentText = await new Response(documentStream).text();

    // const root = new URL("../package", import.meta.url)
    // console.log(root);
    // console.log(import.meta.url);
    // const generator = new Generator({
    //     mapUrl: root,
    //     env: ['production', 'module', 'browser'],
    // });
    // const documentWithImportmap = await generator.htmlInject(documentText, {
    //     trace: true,
    //     esModuleShims: true,
    //     preload: true,
    //     integrity: true,
    //     //rootUrl: root,//new URL("../package", import.meta.url),
    //     htmlUrl: root,
    // })
    //console.log(documentWithImportmap);

    // await generator.link(documentText);
    // console.log(JSON.stringify(generator.getMap(), null, 2));
    await Deno.writeTextFile("package/index.html", documentText);
}

export { ssgDocument }

if (import.meta.main) {
    await ssgDocument();
    console.log("package/index.html generated");
}