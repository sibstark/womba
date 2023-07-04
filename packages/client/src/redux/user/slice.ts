import { AuthAPI } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SigninRequest } from "@types";

import { UserState } from "./types";

function getInitialState(): UserState {
    return {
        fetching: false,
        authorized: true,
        user: {
            id: 1,
            first_name: "Oleg",
            second_name: "Oleg",
            display_name: "Oleg",
            login: "Oleg",
            avatar: "",
            email: "",
            phone: ""
        }
    };
}

export const loginUser = createAsyncThunk("user/login", async (data: SigninRequest) => {
    const api = new AuthAPI();

    await api.singin(data);

    return await api.getUser();
});

export const loadUser = createAsyncThunk("user/load", () => {
    const api = new AuthAPI();

    return api.getUser();
});

export const userSlice = createSlice({
    initialState: getInitialState(),
    name: "user",
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.fetching = false;
                state.authorized = true;
                state.user = action.payload;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.fetching = false;
                state.authorized = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, state => {
                state.fetching = false;
            })
            .addCase(loadUser.rejected, state => {
                state.fetching = false;
            })
            .addCase(loginUser.pending, state => {
                state.fetching = true;
            })
            .addCase(loadUser.pending, state => {
                state.fetching = true;
            });
    }
});
