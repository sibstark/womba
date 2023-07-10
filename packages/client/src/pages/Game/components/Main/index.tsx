import type { Dispatch, SetStateAction } from "react";
import React, { useState, useEffect, useRef } from "react";

import GameContainer from "../../../../containers/GameContainer";
import { resolveNotifications } from "../../../../utils/notifications";

import "./styles.scss";

type TMainProps = {
    score: number;
    newGame: boolean;
    setScore: Dispatch<SetStateAction<number>>;
};

type TNotificator = (
    body: string,
    cb: (isAllowedNotify: boolean) => void
) => (() => void) | undefined;

export const Main: React.FC<TMainProps> = ({ score, setScore, newGame }) => {
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isPermissionGranted, setIsPermissionGranted] = useState<boolean>(false);
    const notificatorRef = useRef<TNotificator>();

    useEffect(() => {
        resolveNotifications().then(notificator => {
            const { notifyGameEnd } = notificator;

            notificatorRef.current = notifyGameEnd;
        });
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

    return (
        <GameContainer
            height="400px"
            width="400px"
            newGame={newGame}
            setScore={setScore}
            setIsGameOver={setIsGameOver}
        />
    );
};
