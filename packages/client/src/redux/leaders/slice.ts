import { LeadersApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetLeadersRequest, SendScoreRequest } from "@types";

import { LeadersState } from "./types";

import { RATING_FIELD_NAME } from "../../consts/leaders";

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
        ratingFieldName: RATING_FIELD_NAME
    };

    const api = new LeadersApi();

    return await api.getLeaders(data);
});

export const sendScore = createAsyncThunk("leaders/add", async (data: SendScoreRequest) => {
    const api = new LeadersApi();

    return await api.sendScore(data);
});

export const leadersSlice = createSlice({
    initialState: getInitialState(),
    name: "leaders",
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadLeaders.fulfilled, (state, action) => {
                state.fetching = false;
                state.leaders = action.payload;
            })
            .addCase(sendScore.fulfilled, (state, action) => {});
    }
});
