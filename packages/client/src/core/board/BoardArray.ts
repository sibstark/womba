import debugResolve from '../../logger/debugResolve'
import getRandomIndex from './getRandomIndex'

type TBoard = {
  id: string
  val: number
  isAvailable: boolean
}

const debug = debugResolve('BoardArray')

const BOARD_WIDTH = 4
const BOARD_HEIGHT = 4

class BoardArray {
  board: TBoard[][] = [
    [
      {
        id: '00',
        val: 0,
        isAvailable: true,
      },
      {
        id: '01',
        val: 0,
        isAvailable: true,
      },
      {
        id: '02',
        val: 0,
        isAvailable: true,
      },
      {
        id: '03',
        val: 0,
        isAvailable: true,
      },
    ],
    [
      {
        id: '10',
        val: 0,
        isAvailable: true,
      },
      {
        id: '11',
        val: 0,
        isAvailable: true,
      },
      {
        id: '12',
        val: 0,
        isAvailable: true,
      },
      {
        id: '13',
        val: 0,
        isAvailable: true,
      },
    ],
    [
      {
        id: '20',
        val: 0,
        isAvailable: true,
      },
      {
        id: '21',
        val: 0,
        isAvailable: true,
      },
      {
        id: '22',
        val: 0,
        isAvailable: true,
      },
      {
        id: '23',
        val: 0,
        isAvailable: true,
      },
    ],
    [
      {
        id: '30',
        val: 0,
        isAvailable: true,
      },
      {
        id: '31',
        val: 0,
        isAvailable: true,
      },
      {
        id: '32',
        val: 0,
        isAvailable: true,
      },
      {
        id: '33',
        val: 0,
        isAvailable: true,
      },
    ],
  ]
  #score = 0

  possibleValues: number[] = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4]

  get possibleValuesLength() {
    return this.possibleValues.length
  }

  get score() {
    return this.#score
  }

  set score(newScore) {
    this.#score = newScore
  }

  updateScore(score: number) {
    this.#score += score
  }

  get availableSquares() {
    return this.board.reduce((acc: string[], row: TBoard[]) => {
      const ids = row.reduce((accRow: string[], val: TBoard) => {
        if (val.isAvailable) {
          accRow.push(val.id)
        }

        return accRow
      }, [])

      acc = acc.concat(ids)

      return acc
    }, [])
  }

  resetBoard() {
    this.board.forEach(row => {
      row.forEach(col => {
        col.val = 0
        col.isAvailable = true
      })
    })
  }

  resetScore() {
    this.score = 0
  }

  getRandomValues(): number {
    const randomValue =
      this.possibleValues[getRandomIndex(this.possibleValuesLength)]

    debug('randomValue', randomValue)

    return randomValue
  }

  getRandomSquareIds(): string {
    debug('availableSquares', this.availableSquares)

    const availableSquaresLength = this.availableSquares.length

    const randomSquareIndex = getRandomIndex(availableSquaresLength)

    debug('randomSquareIndex', randomSquareIndex)

    const id = this.availableSquares[randomSquareIndex]

    debug('id', id)

    return id
  }

  setRandomValue() {
    const randomValue = this.getRandomValues()
    const id = this.getRandomSquareIds()

    this.board.forEach((row: TBoard[]) => {
      row.forEach((col: TBoard) => {
        if (col.id === id) {
          col.val = randomValue
          col.isAvailable = false
        }
      })
    })

    debug('board', this.board)
  }

  mergeUp() {
    for (let col = 0; col < BOARD_WIDTH; col++) {
      for (let row = 1; row < BOARD_HEIGHT; row++) {
        if (!this.board[row][col].val) {
          break
        }

        const currentCell = this.board[row][col]
        const prevCell = this.board[row - 1][col]

        if (currentCell.val === prevCell.val) {
          prevCell.val += currentCell.val

          this.updateScore(prevCell.val)

          currentCell.val = 0
          currentCell.isAvailable = !currentCell.val

          let nextRow = ++row

          while (nextRow < BOARD_HEIGHT) {
            const nextRowCell = this.board[nextRow][col]
            const currentRowCell = this.board[nextRow - 1][col]

            currentRowCell.val = nextRowCell.val
            currentRowCell.isAvailable = !currentRowCell.val

            nextRowCell.val = 0
            nextRowCell.isAvailable = !nextRowCell.val

            nextRow += 1
          }
        }
      }
    }

    debug('board after merge up', this.board)
  }

  moveUp() {
    for (let i = 1; i < BOARD_HEIGHT; i++) {
      for (let j = 0; j < BOARD_WIDTH; j++) {
        if (!this.board[i][j].val) {
          continue
        }

        let row = i

        while (row > 0) {
          const currentCell = this.board[row][j]
          const prevCell = this.board[row - 1][j]

          debug(
            `currentCell id ${currentCell.id} currentCell value ${currentCell.val}`
          )
          debug(`prevCell id ${prevCell.id} prevCell value ${prevCell.val}`)

          if (prevCell.isAvailable) {
            prevCell.val = currentCell.val
            prevCell.isAvailable = !prevCell.val
            currentCell.val = 0
            currentCell.isAvailable = !currentCell.val
          }

          row -= 1
        }
      }
    }

    this.mergeUp()

    debug('board after move up', this.board)
  }

  mergeDown() {
    for (let col = BOARD_WIDTH - 1; col >= 0; col--) {
      for (let row = BOARD_HEIGHT - 2; row >= 0; row--) {
        if (!this.board[row][col].val) {
          break
        }

        const currentCell = this.board[row][col]
        const nextCell = this.board[row + 1][col]

        if (currentCell.val === nextCell.val) {
          nextCell.val += currentCell.val

          this.updateScore(nextCell.val)

          currentCell.val = 0
          currentCell.isAvailable = !currentCell.val

          let nextRow = --row

          while (nextRow >= 0) {
            const nextRowCell = this.board[nextRow][col]
            const currentRowCell = this.board[nextRow + 1][col]

            currentRowCell.val = nextRowCell.val
            currentRowCell.isAvailable = !currentRowCell.val

            nextRowCell.val = 0
            nextRowCell.isAvailable = !nextRowCell.val

            nextRow -= 1
          }
        }
      }
    }

    debug('board after merge up', this.board)
  }

  moveDown() {
    debug('moveDown')

    for (let i = BOARD_HEIGHT - 2; i >= 0; i--) {
      for (let j = BOARD_WIDTH - 1; j >= 0; j--) {
        if (!this.board[i][j].val) {
          continue
        }

        let row = i

        while (row < BOARD_HEIGHT - 1) {
          const currentCell = this.board[row][j]
          const prevCell = this.board[row + 1][j]

          debug(
            `currentCell id ${currentCell.id} currentCell value ${currentCell.val}`
          )
          debug(`prevCell id ${prevCell.id} prevCell value ${prevCell.val}`)

          if (prevCell.isAvailable) {
            prevCell.val = currentCell.val
            prevCell.isAvailable = !prevCell.val
            currentCell.val = 0
            currentCell.isAvailable = !currentCell.val
          }

          row += 1
        }
      }
    }

    this.mergeDown()

    debug('board after move down', this.board)
  }

  mergeLeft() {
    debug('mergeLeft')

    for (let row = 0; row < BOARD_WIDTH; row++) {
      for (let col = 1; col < BOARD_HEIGHT; col++) {
        if (!this.board[row][col].val) {
          break
        }

        const currentCell = this.board[row][col]
        const prevCell = this.board[row][col - 1]

        if (currentCell.val === prevCell.val) {
          prevCell.val += currentCell.val

          this.updateScore(prevCell.val)

          currentCell.val = 0
          currentCell.isAvailable = !currentCell.val

          let nextCol = ++col

          while (nextCol < BOARD_HEIGHT) {
            const nextRowCell = this.board[row][nextCol]
            const currentRowCell = this.board[row][nextCol - 1]

            currentRowCell.val = nextRowCell.val
            currentRowCell.isAvailable = !currentRowCell.val

            nextRowCell.val = 0
            nextRowCell.isAvailable = !nextRowCell.val

            nextCol += 1
          }
        }
      }
    }

    debug('board after merge left', this.board)
  }

  moveLeft() {
    debug('moveLeft')

    for (let i = 1; i < BOARD_HEIGHT; i++) {
      for (let j = 0; j < BOARD_WIDTH; j++) {
        if (!this.board[j][i].val) {
          continue
        }

        let col = i

        while (col > 0) {
          const currentCell = this.board[j][col]
          const prevCell = this.board[j][col - 1]

          if (prevCell.isAvailable) {
            prevCell.val = currentCell.val
            prevCell.isAvailable = !prevCell.val
            currentCell.val = 0
            currentCell.isAvailable = !currentCell.val
          }

          col -= 1
        }
      }
    }

    this.mergeLeft()

    debug('board after move left', this.board)
  }

  mergeRight() {
    debug('mergeRight')

    for (let row = BOARD_WIDTH - 1; row >= 0; row--) {
      for (let col = BOARD_HEIGHT - 2; col >= 0; col--) {
        if (!this.board[row][col].val) {
          break
        }

        const currentCell = this.board[row][col]
        const nextCell = this.board[row][col + 1]

        if (currentCell.val === nextCell.val) {
          nextCell.val += currentCell.val

          this.updateScore(nextCell.val)

          currentCell.val = 0
          currentCell.isAvailable = !currentCell.val

          let prevCol = --col

          while (prevCol >= 0) {
            const prevRowCol = this.board[row][prevCol]
            const currentRowCell = this.board[row][prevCol + 1]

            currentRowCell.val = prevRowCol.val
            currentRowCell.isAvailable = !currentRowCell.val

            prevRowCol.val = 0
            prevRowCol.isAvailable = !prevRowCol.val

            prevCol -= 1
          }
        }
      }
    }

    debug('board after merge right', this.board)
  }

  moveRight() {
    debug('moveRight')

    for (let i = BOARD_WIDTH - 2; i >= 0; i--) {
      for (let j = BOARD_HEIGHT - 1; j >= 0; j--) {
        if (!this.board[j][i].val) {
          continue
        }

        let row = i

        while (row < BOARD_WIDTH - 1) {
          const currentCell = this.board[j][row]
          const nextCell = this.board[j][row + 1]

          if (nextCell.isAvailable) {
            nextCell.val = currentCell.val
            nextCell.isAvailable = !nextCell.val
            currentCell.val = 0
            currentCell.isAvailable = !currentCell.val
          }

          row += 1
        }
      }
    }

    this.mergeRight()

    debug('board after move right', this.board)
  }
}

export default BoardArray
