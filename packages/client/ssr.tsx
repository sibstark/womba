import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { Root } from "./src/containers/root";
export function render(url: string) {
    return renderToString(
        <StaticRouter location={url}>
            <Root />
        </StaticRouter>
    );
}
