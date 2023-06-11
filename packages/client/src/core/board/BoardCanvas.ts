import debugResolve from '../../logger/debugResolve'
import BoardArray from './BoardArray'

const debug = debugResolve('BoardCanvas')

class BoardCanvas {
  #canvas: HTMLCanvasElement
  #canvasContext: CanvasRenderingContext2D
  #boardArray: BoardArray

  #SQUARE_WIDTH = 98
  #SQUARE_HEIGHT = 98
  #SQUARE_GAP = 8
  #BACKGROUND_COLOR = '#bbada0'
  #SQUARE_BACKGROUND_COLOR = '#eee4da59'
  #SQUARE_TEXT_2_BACKGROUND_COLOR = '#eee4da'
  #SQUARE_TEXT_4_BACKGROUND_COLOR = '#ede0c8'
  #SQUARE_TEXT_8_BACKGROUND_COLOR = '#f2b179'
  #SQUARE_TEXT_16_BACKGROUND_COLOR = '#f59563'
  #SQUARE_TEXT_32_BACKGROUND_COLOR = '#f67c5f'
  #SQUARE_TEXT_64_BACKGROUND_COLOR = '#f65e3b'
  #SQUARE_TEXT_128_BACKGROUND_COLOR = '#edcf72'
  #SQUARE_TEXT_256_BACKGROUND_COLOR = '#edcc61'
  #SQUARE_TEXT_512_BACKGROUND_COLOR = '#edc850'
  #SQUARE_TEXT_1024_BACKGROUND_COLOR = '#eee4da'
  #SQUARE_TEXT_2048_BACKGROUND_COLOR = '#eee4da'

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas
    this.#canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D
    this.#boardArray = new BoardArray()
  }

  drawBoard() {
    debug('drawBoard')

    this.colorRect(
      0,
      0,
      this.#canvas.width,
      this.#canvas.height,
      this.#BACKGROUND_COLOR
    )

    this.setInitialValues()
    this.drawSquares()
  }

  updateBoard() {
    debug('updateBoard')

    this.colorRect(
      0,
      0,
      this.#canvas.width,
      this.#canvas.height,
      this.#BACKGROUND_COLOR
    )

    this.#boardArray.setRandomValue()
    this.drawSquares()
  }

  colorRect(
    topLeftX: number,
    topLeftY: number,
    boxWidth: number,
    boxHeight: number,
    fillColor: string
  ) {
    this.#canvasContext.fillStyle = fillColor
    this.#canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
  }

  colorRectWithText(
    topLeftX: number,
    topLeftY: number,
    boxWidth: number,
    boxHeight: number,
    fillColor: string,
    text: string
  ) {
    this.#canvasContext.fillStyle = fillColor
    this.#canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)

    this.#canvasContext.fillStyle = 'black'
    this.#canvasContext.textAlign = 'center'
    this.#canvasContext.textBaseline = 'middle'
    this.#canvasContext.font = '50px sans-serif'
    this.#canvasContext.fillText(
      text,
      topLeftX + boxWidth / 2,
      topLeftY + boxHeight / 2
    )
  }

  setInitialValues() {
    this.#boardArray.setRandomValue()
    this.#boardArray.setRandomValue()
  }

  drawSquares() {
    this.#boardArray.board.forEach((row, rowIdx) => {
      row.forEach(({ val }, colIdx) => {
        const topLeftX = this.#SQUARE_WIDTH * colIdx + this.#SQUARE_GAP
        const topLeftY = this.#SQUARE_HEIGHT * rowIdx + this.#SQUARE_GAP
        const squareBoxWidth = this.#SQUARE_WIDTH - this.#SQUARE_GAP
        const squareBoxHeight = this.#SQUARE_HEIGHT - this.#SQUARE_GAP

        switch (val) {
          case 2:
            this.colorRectWithText(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_TEXT_2_BACKGROUND_COLOR,
              `${val}`
            )
            break
          case 4:
            this.colorRectWithText(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_TEXT_4_BACKGROUND_COLOR,
              `${val}`
            )
            break
          case 8:
            this.colorRectWithText(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_TEXT_8_BACKGROUND_COLOR,
              `${val}`
            )
            break
          case 16:
            this.colorRectWithText(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_TEXT_16_BACKGROUND_COLOR,
              `${val}`
            )
            break
          case 32:
            this.colorRectWithText(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_TEXT_32_BACKGROUND_COLOR,
              `${val}`
            )
            break
          case 64:
            this.colorRectWithText(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_TEXT_64_BACKGROUND_COLOR,
              `${val}`
            )
            break
          case 128:
            this.colorRectWithText(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_TEXT_128_BACKGROUND_COLOR,
              `${val}`
            )
            break
          case 256:
            this.colorRectWithText(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_TEXT_256_BACKGROUND_COLOR,
              `${val}`
            )
            break
          case 512:
            this.colorRectWithText(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_TEXT_512_BACKGROUND_COLOR,
              `${val}`
            )
            break
          case 1024:
            this.colorRectWithText(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_TEXT_1024_BACKGROUND_COLOR,
              `${val}`
            )
            break
          case 2048:
            this.colorRectWithText(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_TEXT_2048_BACKGROUND_COLOR,
              `${val}`
            )
            break
          default:
            this.colorRect(
              topLeftX,
              topLeftY,
              squareBoxWidth,
              squareBoxHeight,
              this.#SQUARE_BACKGROUND_COLOR
            )
        }
      })
    })
  }

  moveUp() {
    this.#boardArray.moveUp()
  }

  moveDown() {
    this.#boardArray.moveDown()
  }

  moveLeft() {
    this.#boardArray.moveLeft()
  }

  moveRight() {
    this.#boardArray.moveRight()
  }

  get currentScore() {
    return this.#boardArray.score
  }
}

export default BoardCanvas
