import BoardArray from "./BoardArray";

import debugResolve from "../../logger/debugResolve";

const debug = debugResolve("BoardCanvas");

class BoardCanvas {
    #canvas: HTMLCanvasElement;
    #canvasContext: CanvasRenderingContext2D;
    #boardArray: BoardArray;

    #SQUARE_WIDTH = 98;
    #SQUARE_HEIGHT = 98;
    #SQUARE_GAP = 8;
    #BACKGROUND_COLOR = "#bbada0";
    #SQUARE_BACKGROUND_COLOR = "#eee4da59";
    #SQUARE_BOX_WIDTH = this.#SQUARE_WIDTH - this.#SQUARE_GAP;
    #SQUARE_BOX_HEIGHT = this.#SQUARE_HEIGHT - this.#SQUARE_GAP;
    VALUE_TO_COLOR_MAP = {
        "2": "#eee4da",
        "4": "#ede0c8",
        "8": "#f2b179",
        "16": "#f59563",
        "32": "#f67c5f",
        "64": "#f65e3b",
        "128": "#edcf72",
        "256": "#edcc61",
        "512": "#edc850",
        "1024": "#eee4da",
        "2048": "#eee4da"
    };

    constructor(canvas: HTMLCanvasElement) {
        this.#canvas = canvas;
        this.#canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.#boardArray = new BoardArray();
    }

    drawBoard() {
        debug("drawBoard");

        this.colorRect(0, 0, this.#canvas.width, this.#canvas.height, this.#BACKGROUND_COLOR);

        this.setInitialValues();
        this.drawSquares();
    }

    updateBoard() {
        debug("updateBoard");

        this.colorRect(0, 0, this.#canvas.width, this.#canvas.height, this.#BACKGROUND_COLOR);

        this.#boardArray.setRandomValue();
        this.drawSquares();
    }

    colorRect(
        topLeftX: number,
        topLeftY: number,
        boxWidth: number,
        boxHeight: number,
        fillColor: string
    ) {
        this.#canvasContext.fillStyle = fillColor;
        this.#canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
    }

    colorRectWithText(
        topLeftX: number,
        topLeftY: number,
        boxWidth: number,
        boxHeight: number,
        fillColor: string,
        text: string
    ) {
        this.#canvasContext.fillStyle = fillColor;
        this.#canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);

        this.#canvasContext.fillStyle = "black";
        this.#canvasContext.textAlign = "center";
        this.#canvasContext.textBaseline = "middle";
        this.#canvasContext.font = "50px sans-serif";
        this.#canvasContext.fillText(text, topLeftX + boxWidth / 2, topLeftY + boxHeight / 2);
    }

    setInitialValues() {
        this.#boardArray.setRandomValue();
        this.#boardArray.setRandomValue();
    }

    reset() {
        this.#boardArray.resetBoard();
        this.#boardArray.resetScore();
    }

    drawSquares() {
        this.#boardArray.board.forEach((row, rowIdx) => {
            const topLeftY = this.#SQUARE_HEIGHT * rowIdx + this.#SQUARE_GAP;

            row.forEach(({ val }, colIdx) => {
                const topLeftX = this.#SQUARE_WIDTH * colIdx + this.#SQUARE_GAP;

                if (val === 0) {
                    this.colorRect(
                        topLeftX,
                        topLeftY,
                        this.#SQUARE_BOX_WIDTH,
                        this.#SQUARE_BOX_HEIGHT,
                        this.#SQUARE_BACKGROUND_COLOR
                    );
                } else {
                    const textValue = `${val}` as keyof typeof this.VALUE_TO_COLOR_MAP;
                    const backgroundColor = this.VALUE_TO_COLOR_MAP[textValue];

                    this.colorRectWithText(
                        topLeftX,
                        topLeftY,
                        this.#SQUARE_BOX_WIDTH,
                        this.#SQUARE_BOX_HEIGHT,
                        backgroundColor,
                        textValue
                    );
                }
            });
        });
    }

    moveUp() {
        this.#boardArray.moveUp();
    }

    moveDown() {
        this.#boardArray.moveDown();
    }

    moveLeft() {
        this.#boardArray.moveLeft();
    }

    moveRight() {
        this.#boardArray.moveRight();
    }

    hasGameOver() {
        return this.#boardArray.hasGameOver();
    }

    get currentScore() {
        return this.#boardArray.score;
    }
}

export default BoardCanvas;
