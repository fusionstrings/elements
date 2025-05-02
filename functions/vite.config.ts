import { defineConfig } from "npm:vite";
import deno from "npm:@deno/vite-plugin";

export default defineConfig({
    plugins: [deno()],
    build: {
        rollupOptions: {
            external:[]
        }
    }
});