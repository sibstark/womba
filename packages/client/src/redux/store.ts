import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

import { createUserSlice, UserState } from "./user";

export type RootState = { user: UserState };

export let store: EnhancedStore<RootState, any>;

export function createStore(data: Partial<RootState> = {}) {
    console.log("store", store);
    if (store) {
        return store;
    }
    const reducer = {
        user: createUserSlice(data.user).reducer
    };

    store = configureStore<RootState>({ reducer });

    return store;
}
