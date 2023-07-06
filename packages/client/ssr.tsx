import fetch, { HeadersInit } from "node-fetch";
// @ts-ignore
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";

import { Root } from "./src/containers/router";
import { createStore } from "./src/redux/store";
import { User } from "./src/types";

async function fetchUserData(headers: HeadersInit): Promise<User | undefined> {
    try {
        const url = process.env.API_URL + "/auth/user";
        const response = await fetch(url, {
            headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user data: code ${response.status}`);
        }

        return (await response.json()) as User;
    } catch (error) {
        console.error("Error fetching user data:", error);

        return undefined;
    }
}

export async function render(url: string, headers: HeadersInit) {
    const user = await fetchUserData(headers);
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
    console.log("initialState", initialState);
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
