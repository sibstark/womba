import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

import { LeadersState, reducer as leadersReducer } from "./leaders";
import { createUserSlice, UserState } from "./user";

export type RootState = { user: UserState; leaders: LeadersState };

export let store: EnhancedStore<RootState, any>;

export function createStore(data: Partial<RootState> = {}) {
    const reducer = {
        leaders: leadersReducer,
        user: createUserSlice(data.user).reducer
    };

    store = configureStore<RootState>({ reducer });

    return store;
}
