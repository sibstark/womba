import { RootState } from "../../../store";

export function getUser(state: RootState) {
    return state.user.user;
}
