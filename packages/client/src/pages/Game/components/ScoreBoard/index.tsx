import React from "react";

import "./styles.scss";

type TScoreBoardProps = {
    score: number;
    bestScore: number;
};

export const ScoreBoard: React.FC<TScoreBoardProps> = ({ score, bestScore }) => (
    <div className="scoreBoard">
        <div className="scoreBoard__block">
            <span className="scoreBoard__block__title">Score</span>
            <div className="scoreBoard__block__content">{score}</div>
        </div>
        <div className="scoreBoard__block">
            <span className="scoreBoard__block__title">Best</span>
            <div className="scoreBoard__block__content">{bestScore}</div>
        </div>
    </div>
);
