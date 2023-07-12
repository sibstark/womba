import { GetLeadersRequest, Leader, SendScoreRequest } from "@types";

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

    sendScore(data: SendScoreRequest) {
        return this.http.post("", {
            data
        });
    }
}

export default new LeadersApi();
