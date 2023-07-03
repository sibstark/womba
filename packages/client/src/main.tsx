import { store } from "@redux/store";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { Root } from "./containers/root";
import * as serviceWorker from "./utils/sw-register";
import "./index.scss";

ReactDOM.hydrateRoot(
    document.getElementById("root") as HTMLElement,
    <React.StrictMode>
        <Provider store={store}>
            <Root />
        </Provider>
    </React.StrictMode>
);

serviceWorker.startServiceWorker();
