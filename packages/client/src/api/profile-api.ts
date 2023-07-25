import { TPassword, TProfileForm } from "@types";
import { TOptions } from "@utils";

import BaseAPI from "./base-api";

class ProfileAPI extends BaseAPI {
    constructor() {
        super("/user");
    }
    public updateProfile(data: TProfileForm): Promise<unknown> {
        return this.http.put(`/profile`, {
            data
        });
    }

    public updateAvatar(data: TOptions): Promise<unknown> {
        data.headers = {
            "Content-Type": "multipart/form-data"
        };

        return this.http.put(`/profile/avatar`, data);
    }

    public updatePassword(data: TPassword): Promise<unknown> {
        return this.http.put(`/password`, { data });
    }
}

export { ProfileAPI };
