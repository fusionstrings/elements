import { TypeScriptBundler } from "./ts-compiler.ts";
import { resolve } from "node:path";
import * as ts from "typescript";
import process from "node:process";

async function bundleDomMain() {
  const bundler = new TypeScriptBundler({
    entryPoint: resolve(Deno.cwd(), "dom/main.ts"),
    importMapPath: resolve(Deno.cwd(), "deno.json"),
    outFile: resolve(Deno.cwd(), "dist/dom/main.js"),
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      jsxImportSource: "preact",
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ES2022,
    }
  });

  try {
    console.log("Starting TypeScript compilation...");
    const result = await bundler.bundle();
    console.log("✅ Successfully bundled dom/main.ts");
    console.log(`📄 Output written to: dist/dom/main.js`);
    console.log(`📊 Bundle size: ${result.length} characters`);
    
    // Show a preview of the bundled code
    const preview = result.substring(0, 500) + (result.length > 500 ? "..." : "");
    console.log("\n📋 Preview:");
    console.log(preview);
    
  } catch (error) {
    console.error("❌ Bundling failed:", error);
    process.exit(1);
  }
}

if (import.meta.main) {
  bundleDomMain();
}