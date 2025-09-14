const result = await Deno.bundle({
  entrypoints: ["./dom/main.ts"],
  outputDir: "build",
  platform: "browser",
  minify: true,
  
});
console.log(result);