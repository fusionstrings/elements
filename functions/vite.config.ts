import { defineConfig } from "npm:vite";
import deno from "npm:@deno/vite-plugin";
import { cloudflare } from "npm:@cloudflare/vite-plugin";

export default defineConfig({
    plugins: [deno(), cloudflare()],
    build: {
        rollupOptions: {
            external:[]
        }
    }
});