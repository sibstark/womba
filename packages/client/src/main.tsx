import { createStore } from "@redux/store";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Root } from "./containers/router";
import * as serviceWorker from "./utils/sw-register";
import "./index.scss";

const store = createStore(window.__REDUX_STATE__);

delete window.__REDUX_STATE__;

ReactDOM.hydrateRoot(
    document.getElementById("root") as HTMLElement,
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

serviceWorker.startServiceWorker();
