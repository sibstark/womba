import * as path from "path";

import { defineConfig } from "vite";

import { config } from "./config";

// https://vitejs.dev/config/
export default defineConfig({
    ...config,
    build: {
        lib: {
            entry: path.resolve(__dirname, "ssr.tsx"),
            name: "Client",
            formats: ["cjs"]
        },
        rollupOptions: {
            output: {
                dir: "ssr-dist"
            }
        }
    }
});
