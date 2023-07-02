import { Button } from "@ui/components";
import { useFullscreenStatus } from "@utils";
import React from "react";

import "./styles.scss";

type TButtonsBoardProps = {
    startNewGame: () => void;
    onFullscreen: () => void;
};

export const ButtonsBoard: React.FC<TButtonsBoardProps> = ({ startNewGame, onFullscreen }) => {
    const isFullscreen = useFullscreenStatus();

    return (
        <div className="buttonsBoard">
            <Button className="buttonsBoard__button" onClick={startNewGame}>
                New Game
            </Button>
            {!isFullscreen && (
                <Button className="buttonsBoard__button" onClick={onFullscreen}>
                    Full screen
                </Button>
            )}
        </div>
    );
};
