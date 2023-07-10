import { GetLeadersRequest, Leader } from "@types";

import BaseAPI from "./base-api";

export class LeadersApi extends BaseAPI {
    constructor() {
        super("/leaderboard");
    }

    getLeaders(data: GetLeadersRequest) {
        return this.http.post<Leader[]>("/all", {
            data
        });
    }
}
