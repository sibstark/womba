import fs from "fs";
import path from "path";
import * as process from "process";

import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { createServer as createViteServer, ViteDevServer } from "vite";

import { isDev, isProduction } from "./env";
dotenv.config();

async function startServer() {
    const app = express();

    app.use(cors());
    const port = Number(process.env.SERVER_PORT) || 3001;

    app.get("/api", (_, res) => {
        res.json("👋 Howdy from the server :)");
    });

    // Use vite's connect instance as middleware. If you use your own
    // express router (express.Router()), you should use router.use
    let vite: ViteDevServer | undefined;
    const libPath = path.dirname(require.resolve("client"));
    let distPath = "";

    if (isProduction()) {
        distPath = path.dirname(require.resolve("client/dist/index.html"));
    }
    if (isDev()) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: libPath,
            appType: "custom"
        });

        app.use(vite.middlewares);
    }

    if (isProduction()) {
        app.use("/assets", express.static(path.resolve(distPath, "assets")));
        app.use("/service-worker.js", express.static(path.resolve(distPath, "service-worker.js")));
    }

    // https://vitejs.dev/guide/ssr.html
    app.use("*", async (req: Request, res: Response, next) => {
        const url = req.originalUrl;

        try {
            // 1. Read index.html
            const htmlPath = isProduction() ? distPath : libPath;
            let template = fs.readFileSync(path.resolve(htmlPath, "index.html"), "utf-8");

            // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
            //    and also applies HTML transforms from Vite plugins, e.g. global
            //    preambles from @vitejs/plugin-react
            if (isDev()) {
                template = await vite!.transformIndexHtml(url, template);
            }
            let appHtml: string = "";

            // 3. Load the server entry. ssrLoadModule automatically transforms
            //    ESM source code to be usable in Node.js! There is no bundling
            //    required, and provides efficient invalidation similar to HMR.
            // AND
            // 4. render the app HTML. This assumes entry-server.js's exported
            //     `render` function calls appropriate framework SSR APIs,
            //    e.g. ReactDOMServer.renderToString()
            // const userData = await fetchUserData();

            // console.log(userData);
            let preloadedState: unknown;

            if (isProduction()) {
                const ssrClientPath = require.resolve("client/ssr-dist/client.cjs");
                const render = (await import(ssrClientPath)).render;
                const { html, state } = await render(url, { Cookie: req.headers.cookie });

                preloadedState = state;
                appHtml = html;
            }

            if (isDev()) {
                const render = (await vite!.ssrLoadModule("ssr.tsx")).render;
                const { html, state } = await render(url, { Cookie: req.headers.cookie });

                preloadedState = state;
                appHtml = html;
            }

            // 5. Inject the app-rendered HTML into the template.
            const reduxState = `<script>
          window.__REDUX_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, "\\u003c")}
        </script>`;

            const html = template
                .replace(`<!--ssr-outlet-->`, appHtml)
                .replace(`<!--redux-outlet-->`, reduxState);

            // 6. Send the rendered HTML back.
            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e: any) {
            // If an error is caught, let Vite fix the stack trace so it maps back
            // to your actual source code.
            if (isDev()) {
                vite!.ssrFixStacktrace(e);
            }
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();
