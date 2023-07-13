import { RootState } from "../store";

export function getLeaders(state: RootState) {
    return state.leaders.leaders;
}

export function getIsFetching(state: RootState) {
    return state.leaders.fetching;
}
