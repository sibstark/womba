import { configureStore } from "@reduxjs/toolkit";

import { reducer as userReducer } from "./user";

const reducer = {
    user: userReducer
};

export const store = configureStore({ reducer });

export const dispatch = store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
