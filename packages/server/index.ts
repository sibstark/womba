// import { Root } from "client";
import fs from "fs";
import path from "path";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer as createViteServer } from "vite";
dotenv.config();

async function startServer() {
    const app = express();
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom"
    });

    app.use(cors());
    // app.use(render);
    const port = Number(process.env.SERVER_PORT) || 3001;

    app.get("/api", (_, res) => {
        res.json("👋 Howdy from the server :)");
    });

    // https://vitejs.dev/guide/ssr.html
    app.use("*", async (req, res, next) => {
        const url = req.originalUrl;
        const distPath = path.dirname(require.resolve("client/dist/index.html"));
        // const srcPath = path.dirname(require.resolve("client"));
        const ssrClientPath = require.resolve("client/ssr-dist/client.cjs");

        try {
            // 1. Read index.html
            const template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

            // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
            //    and also applies HTML transforms from Vite plugins, e.g. global
            //    preambles from @vitejs/plugin-react
            // template = await vite.transformIndexHtml(url, template);

            // 3. Load the server entry. ssrLoadModule automatically transforms
            //    ESM source code to be usable in Node.js! There is no bundling
            //    required, and provides efficient invalidation similar to HMR.
            // const { render } = await vite.ssrLoadModule("/src/entry-server.js");
            const { render } = await import(ssrClientPath);

            // 4. render the app HTML. This assumes entry-server.js's exported
            //     `render` function calls appropriate framework SSR APIs,
            //    e.g. ReactDOMServer.renderToString()
            const appHtml = await render(url);

            // 5. Inject the app-rendered HTML into the template.
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);

            // 6. Send the rendered HTML back.
            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e: any) {
            // If an error is caught, let Vite fix the stack trace so it maps back
            // to your actual source code.
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();
