import { withProtection } from "@containers";
import { ButtonsBoard } from "@pages/Game/components/ButtonsBoard";
import { useFullScreen } from "@utils";
import { useEffect, useState, useCallback } from "react";
import { useRef } from "react";

import { Main } from "./components/Main";
import { ScoreBoard } from "./components/ScoreBoard";

import debugResolve from "../../logger/debugResolve";
import "./styles.scss";

const debug = debugResolve("GamePage");

export const GamePage = withProtection(() => {
    const ref = useRef<HTMLDivElement>(null);
    const { onFullscreen } = useFullScreen(ref);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [newGame, setNewGame] = useState(false);

    const startNewGame = useCallback(() => {
        setNewGame(true);

        setTimeout(() => {
            setNewGame(false);
        }, 100);
    }, []);

    const handleStartNewGame = useCallback(() => {
        debug("handleStartNewGame");

        setScore(0);

        startNewGame();
    }, []);

    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
        }
    }, [score]);

    return (
        <div ref={ref} className="game">
            <ScoreBoard score={score} bestScore={bestScore} />
            <Main score={score} setScore={setScore} newGame={newGame} />
            <ButtonsBoard startNewGame={handleStartNewGame} onFullscreen={onFullscreen} />
        </div>
    );
});
