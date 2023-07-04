import { configureStore } from "@reduxjs/toolkit";

import { reducer as userReducer } from "./user";

const reducer = {
    user: userReducer
};

if (typeof window !== "undefined") {
    delete window.__REDUX_STATE__;
}
export const store = configureStore({ reducer });

export const dispatch = store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
