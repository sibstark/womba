import React, { useRef, useEffect, useCallback } from 'react'
import debugResolve from '../../logger/debugResolve'
import Game from '../../core/game/Game'

const debug = debugResolve('GameContainer')

type TCanvasProps = {
  height: string
  width: string
}

const KEY_CODE_ARROW_UP = 38
const KEY_CODE_ARROW_DOWN = 40
const KEY_CODE_ARROW_LEFT = 37
const KEY_CODE_ARROW_RIGHT = 39
const KEY_CODE_W = 87
const KEY_CODE_S = 83
const KEY_CODE_A = 65
const KEY_CODE_D = 68

const GameContainer: React.FC<TCanvasProps> = ({ height, width }) => {
  const canvasRef = useRef(null)
  const gameRef = useRef<Game | null>(null)

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const { keyCode } = event

    debug('keyCode', keyCode)

    if (gameRef.current) {
      switch (keyCode) {
        case KEY_CODE_ARROW_UP:
        case KEY_CODE_W:
          gameRef.current.moveUp()
          break
        case KEY_CODE_ARROW_DOWN:
        case KEY_CODE_S:
          gameRef.current.moveDown()
          break
        case KEY_CODE_ARROW_LEFT:
        case KEY_CODE_A:
          gameRef.current.moveLeft()
          break
        case KEY_CODE_ARROW_RIGHT:
        case KEY_CODE_D:
          gameRef.current.moveRight()
          break
      }

      gameRef.current.updateScore(currentScore => {
        debug('currentScore', currentScore)
      })
      gameRef.current.checkEndConditions()
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      gameRef.current = new Game(canvasRef.current)
    }

    gameRef.current?.start()
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return <canvas width={width} height={height} ref={canvasRef}></canvas>
}

export default GameContainer
