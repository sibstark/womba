import { configureStore } from "@reduxjs/toolkit";

import { reducer as leadersReducer } from "./leaders";
import { reducer as userReducer } from "./user";

const reducer = {
    leaders: leadersReducer,
    user: userReducer
};

export const store = configureStore({ reducer });

export const dispatch = store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
