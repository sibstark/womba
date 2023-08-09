import React, {
    useRef,
    useEffect,
    useLayoutEffect,
    useCallback,
    forwardRef,
    useImperativeHandle
} from "react";
import type { Dispatch, SetStateAction } from "react";

import Game from "../../core/game/Game";
import { isDev } from "../../env";
import debugResolve from "../../logger/debugResolve";
import { measurePaint } from "../../utils/performance";

const debug = debugResolve("GameContainer");

type TGameProps = {
    height: string;
    width: string;
    setScore: Dispatch<SetStateAction<number>>;
    onGameOver: () => void;
};

export type GameForwardProps = {
    start: () => void;
    restart: () => void;
};

const KEY_CODE_ARROW_UP = "ArrowUp";
const KEY_CODE_ARROW_DOWN = "ArrowDown";
const KEY_CODE_ARROW_LEFT = "ArrowLeft";
const KEY_CODE_ARROW_RIGHT = "ArrowRight";
const KEY_CODE_W = "KeyW";
const KEY_CODE_S = "KeyS";
const KEY_CODE_A = "KeyA";
const KEY_CODE_D = "KeyD";

const GameContainer = forwardRef<GameForwardProps, TGameProps>(
    ({ height, width, setScore, onGameOver }, ref) => {
        const canvasRef = useRef(null);
        const gameRef = useRef<Game | null>(null);

        useImperativeHandle(ref, () => {
            return {
                restart: () => {
                    if (canvasRef.current && gameRef.current) {
                        gameRef.current.restart();
                    }
                },
                start: () => {
                    if (canvasRef.current) {
                        gameRef.current = new Game(canvasRef.current);
                    }

                    gameRef.current?.start();
                }
            };
        });

        const handleKeyPress = useCallback(
            (event: KeyboardEvent) => {
                const { code } = event;

                debug("code", code);

                if (gameRef.current) {
                    switch (code) {
                        case KEY_CODE_ARROW_UP:
                        case KEY_CODE_W:
                            gameRef.current.moveUp();
                            break;
                        case KEY_CODE_ARROW_DOWN:
                        case KEY_CODE_S:
                            gameRef.current.moveDown();
                            break;
                        case KEY_CODE_ARROW_LEFT:
                        case KEY_CODE_A:
                            gameRef.current.moveLeft();
                            break;
                        case KEY_CODE_ARROW_RIGHT:
                        case KEY_CODE_D:
                            gameRef.current.moveRight();
                            break;
                    }

                    setScore(gameRef.current.updateScore());

                    const isGameOver = gameRef.current.checkEndConditions();

                    if (isGameOver) {
                        onGameOver();
                    }
                }
            },
            [setScore]
        );

        useLayoutEffect(() => {
            if (isDev()) {
                measurePaint();
            }
        }, []);

        useEffect(() => {
            document.addEventListener("keydown", handleKeyPress);

            return () => {
                document.removeEventListener("keydown", handleKeyPress);
            };
        }, [handleKeyPress]);

        return <canvas width={width} height={height} ref={canvasRef}></canvas>;
    }
);

export default GameContainer;
