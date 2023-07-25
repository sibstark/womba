import { withProtection } from "@containers";
import React from "react";

import { Row } from "./components/row";

import { Theme } from "../../types/forum";

import "./styles.scss";

const data: Theme[] = [
    {
        id: 1,
        title: "Новые игры",
        themeCount: 222,
        answerCount: 345
    },
    {
        id: 2,
        title: "Геймдизайнеры",
        themeCount: 5,
        answerCount: 14
    },
    {
        id: 3,
        title: "Технологии",
        themeCount: 590,
        answerCount: 895
    },
    {
        id: 4,
        title: "Новые игры",
        themeCount: 222,
        answerCount: 345
    },
    {
        id: 5,
        title: "Геймдизайнеры",
        themeCount: 5,
        answerCount: 14
    },
    {
        id: 6,
        title: "Технологии",
        themeCount: 590,
        answerCount: 895
    },
    {
        id: 7,
        title: "Новые игры",
        themeCount: 222,
        answerCount: 345
    },
    {
        id: 8,
        title: "Геймдизайнеры",
        themeCount: 5,
        answerCount: 14
    }
];

export const ForumPage = withProtection(() => {
    return (
        <div className="forum">
            <div className="forum__header">
                <div className="forum__header__cell">Форумы</div>
                <div className="forum__header__cell">Темы</div>
                <div className="forum__header__cell">Ответы</div>
            </div>
            {data.map(el => (
                <Row {...el} key={el.id} />
            ))}
        </div>
    );
});
