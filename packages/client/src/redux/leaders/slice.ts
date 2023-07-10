import { LeadersApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetLeadersRequest } from "@types";

import { LeadersState } from "./types";

function getInitialState(): LeadersState {
    return {
        fetching: true,
        leaders: []
    };
}

export const loadLeaders = createAsyncThunk("leaders/load", async () => {
    const data: GetLeadersRequest = {
        cursor: 0,
        limit: 100,
        ratingFieldName: "womba"
    };

    const api = new LeadersApi();

    return await api.getLeaders(data);
});

export const leadersSlice = createSlice({
    initialState: getInitialState(),
    name: "leaders",
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadLeaders.fulfilled, (state, action) => {
            state.fetching = false;
            state.leaders = action.payload;
        });
    }
});
