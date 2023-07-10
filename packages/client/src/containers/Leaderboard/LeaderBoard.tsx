import { getIsFetching, getLeaders, loadLeaders } from "@redux/leaders";
import { dispatch } from "@redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "./styles.scss";

export const LeaderBoard: React.FC = () => {
    useEffect(() => {
        dispatch(loadLeaders());
    }, []);

    const leaders = useSelector(getLeaders);
    const isLoading = useSelector(getIsFetching);

    return (
        <>
            {isLoading ? (
                <div>Загрузка</div>
            ) : (
                <ul className="leader-board">
                    {leaders.map(leader => {
                        return (
                            <li>
                                {/*
                        <img src={leader.avatar} />
                        <p className="leader-board_nickname">{leader.nickName}</p>
                        <p>{leader.score}</p>
*/}
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};
