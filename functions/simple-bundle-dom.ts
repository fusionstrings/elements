import { SimpleBundler } from "./simple-bundler.ts";
import { resolve } from "node:path";

function bundleDomMain() {
  const bundler = new SimpleBundler({
    entryPoint: resolve(Deno.cwd(), "dom/main.ts"),
    importMapPath: resolve(Deno.cwd(), "deno.json"),
    outFile: resolve(Deno.cwd(), "dist/dom/main.js"),
  });

  try {
    console.log("Starting simple bundling...");
    const result = bundler.bundle();
    console.log("✅ Successfully bundled dom/main.ts");
    
    // Show a preview of the bundled code
    const lines = result.split('\n');
    const preview = lines.slice(0, 30).join('\n') + (lines.length > 30 ? "\n... (truncated)" : "");
    console.log("\n📋 Preview:");
    console.log(preview);
    
  } catch (error) {
    console.error("❌ Bundling failed:", error);
    Deno.exit(1);
  }
}

if (import.meta.main) {
  bundleDomMain();
}