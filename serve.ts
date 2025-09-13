const result = await Deno.bundle({
  entrypoints: ["./templates/template.html"],
  outputDir: "dist",
  platform: "browser",
  minify: true,
});
console.log(result);