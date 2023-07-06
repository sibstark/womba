// @ts-ignore
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";

import { Root } from "./src/containers/router";
import { createStore } from "./src/redux/store";
import { User } from "./src/types";

export async function render(url: string, user: User) {
    const initialState: any = {
        user: {
            authorized: !!user,
            // @ts-ignore
            fetching: false
        }
    };

    if (user) {
        initialState.user.user = user;
    }
    const store = createStore(initialState);

    const html = renderToString(
        <React.StrictMode>
            <Provider store={store}>
                <StaticRouter location={url}>
                    <Root />
                </StaticRouter>
            </Provider>
        </React.StrictMode>
    );

    return { html, state: store.getState() };
}
