import React from "react";
import "./styles.scss";

type TLeader = {
    avatar: string;
    nickName: string;
    score: number;
};
type TLeaderBoardProps = {
    leaders: TLeader[];
};

const Leaderboard: React.FC<TLeaderBoardProps> = props => {
    const { leaders } = props;

    return (
        <ul className="leader-board">
            {leaders.map(leader => {
                return (
                    <li>
                        <img src={leader.avatar} />
                        <p className="leader-board_nickname">{leader.nickName}</p>
                        <p>{leader.score}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export { Leaderboard };
