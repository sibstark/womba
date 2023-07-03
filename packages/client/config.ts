import * as path from "path";

import react from "@vitejs/plugin-react";
import { UserConfigExport } from "vite";

// @ts-ignore
import { serviceWorker } from "./sw-plugin";

export const config: UserConfigExport = {
    plugins: [react(), serviceWorker()],
    esbuild: {
        logOverride: { "this-is-undefined-in-esm": "silent" }
    },
    resolve: {
        alias: {
            "@ui/components": path.resolve(__dirname, "./src/ui/components"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@types": path.resolve(__dirname, "./src/types"),
            "@containers": path.resolve(__dirname, "./src/containers"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@api": path.resolve(__dirname, "./src/api"),
            "@controllers": path.resolve(__dirname, "./src/controllers"),
            "@static": path.resolve(__dirname, "./src/static"),
            "@redux": path.resolve(__dirname, "./src/redux")
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "${path.resolve(__dirname, "./src/_variables")}";`
            }
        }
    }
};
