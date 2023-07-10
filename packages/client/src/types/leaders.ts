export type GetLeadersRequest = {
    cursor: number;
    limit: number;
    ratingFieldName: string;
};

export type ScoreData = {
    id: number;
    login: string;
    avatar: string;
    womba: number;
};

export type SendScoreRequest = {
    data: ScoreData;
    ratingFieldName: string;
};

export type Leader = {};
