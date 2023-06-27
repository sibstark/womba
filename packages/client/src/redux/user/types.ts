import { ILoadable, User } from "@types";

export interface UserState extends ILoadable {
    authorized: boolean;
    user: User;
}
