import { withProtection } from "@containers";

import { LeaderBoard } from "../../containers/Leaderboard/LeaderBoard";

import "./styles.scss";

export const LeaderBoardPage = withProtection(() => {
    return (
        <div className="leaders-page">
            <h3>Лучшие игроки</h3>
            <LeaderBoard />
        </div>
    );
});
