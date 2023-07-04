// @ts-ignore
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";

import { Root } from "./src/containers/router";
import { store } from "./src/redux/store";
import "./src/index.scss";

export function render(url: string) {
    return renderToString(
        <React.StrictMode>
            <Provider store={store}>
                <StaticRouter location={url}>
                    <Root />
                </StaticRouter>
            </Provider>
        </React.StrictMode>
    );
}
