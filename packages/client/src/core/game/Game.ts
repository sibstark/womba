import debugResolve from '../../logger/debugResolve'
import BoardCanvas from '../board/BoardCanvas'

const debug = debugResolve('Game')

class Game {
  #boardCanvas: BoardCanvas

  constructor(canvas: HTMLCanvasElement) {
    this.#boardCanvas = new BoardCanvas(canvas)
  }

  start() {
    debug('start')

    this.drawBoard()
  }

  drawBoard() {
    this.#boardCanvas.drawBoard()
  }

  moveUp() {
    debug('moveUp')

    this.#boardCanvas.moveUp()
    this.updateBoard()
  }

  moveDown() {
    debug('moveDown')

    this.#boardCanvas.moveDown()
    this.updateBoard()
  }

  moveLeft() {
    debug('moveLeft')

    this.#boardCanvas.moveLeft()
    this.updateBoard()
  }

  moveRight() {
    debug('moveRight')

    this.#boardCanvas.moveRight()
    this.updateBoard()
  }

  updateBoard() {
    debug('updateBoard')

    this.#boardCanvas.updateBoard()
  }

  updateScore(callback: (score: number) => void) {
    debug('updateScore')

    callback(this.#boardCanvas.currentScore)
  }

  checkEndConditions() {
    debug('checkEndConditions')
  }
}

export default Game
