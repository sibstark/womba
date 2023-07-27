import { withProtection } from "@containers";
import { sendScore } from "@redux/leaders";
import { store } from "@redux/store";
import { getUser } from "@redux/user";
import { SendScoreRequest } from "@types";
import { Button } from "@ui/components";
import { useFullScreen, useFullscreenStatus } from "@utils";
import classnames from "classnames";
import React, { useEffect, useState, useCallback } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

import { ScoreBoard } from "./components/ScoreBoard";

import { RATING_FIELD_NAME } from "../../consts/leaders";
import GameContainer, { GameForwardProps } from "../../containers/GameContainer";
import debugResolve from "../../logger/debugResolve";
import { resolveNotifications } from "../../utils/notifications";
import "./styles.scss";

const debug = debugResolve("GamePage");

type TNotificator = (
    body: string,
    cb: (isAllowedNotify: boolean) => void
) => (() => void) | undefined;
export const GamePage = withProtection(() => {
    const gameRef = useRef<GameForwardProps>(null);
    const ref = useRef<HTMLDivElement>(null);
    const { onFullscreen } = useFullScreen(ref);
    const isFullscreen = useFullscreenStatus();
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [newGame, setNewGame] = useState(false);

    const user = useSelector(getUser);
    const [isPermissionGranted, setIsPermissionGranted] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const notificatorRef = useRef<TNotificator>();

    const startNewGame = useCallback(() => {
        setNewGame(true);
        setIsGameOver(false);

        gameRef.current?.start();
    }, []);

    const handleStartNewGame = useCallback(() => {
        debug("handleStartNewGame");

        setScore(0);

        startNewGame();
    }, [startNewGame]);

    const handleGameOver = useCallback(() => {
        setIsGameOver(true);
        setNewGame(false);
    }, []);

    useEffect(() => {
        if (isGameOver) {
            const message = `Game is over! Your score is ${score}`;

            if (notificatorRef.current) {
                notificatorRef.current(message, setIsPermissionGranted);
            }

            if (!isPermissionGranted) {
                alert(message);
            }
        }
    }, [isGameOver, isPermissionGranted, score]);

    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
        }
    }, [score, bestScore]);

    useEffect(() => {
        if (isGameOver) {
            const data: SendScoreRequest = {
                data: {
                    avatar: user.avatar,
                    id: user.id,
                    login: user.login,
                    womba: bestScore
                },
                ratingFieldName: RATING_FIELD_NAME
            };

            store.dispatch(sendScore(data));
        }
    }, [isGameOver, bestScore]);

    useEffect(() => {
        resolveNotifications().then(notificator => {
            const { notifyGameEnd } = notificator;

            notificatorRef.current = notifyGameEnd;
        });
        gameRef.current?.start();
    }, []);

    return (
        <div ref={ref} className="game">
            <ScoreBoard score={score} bestScore={bestScore} />
            <div className={classnames("game-filter", { "game-filter--off": newGame })}>
                <div className="game-window__filter" />
                <GameContainer
                    ref={gameRef}
                    height="400px"
                    width="400px"
                    setScore={setScore}
                    onGameOver={handleGameOver}
                />
            </div>
            {isGameOver && <div className="game-over">It's over! Your score is {score}</div>}
            {!newGame && (
                <Button
                    className="buttonsBoard__button buttonsBoard__button--start"
                    onClick={handleStartNewGame}
                >
                    Start game
                </Button>
            )}
            <div className="buttonsBoard">
                {!isFullscreen && (
                    <Button className="buttonsBoard__button" onClick={onFullscreen}>
                        Full screen
                    </Button>
                )}
            </div>
        </div>
    );
});
