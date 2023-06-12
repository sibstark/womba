import React, { useRef, useEffect, useCallback } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import debugResolve from '../../logger/debugResolve'
import Game from '../../core/game/Game'

const debug = debugResolve('GameContainer')

type TCanvasProps = {
  height: string
  width: string
  newGame: boolean
  setScore: Dispatch<SetStateAction<number>>
}

const KEY_CODE_ARROW_UP = 'ArrowUp'
const KEY_CODE_ARROW_DOWN = 'ArrowDown'
const KEY_CODE_ARROW_LEFT = 'ArrowLeft'
const KEY_CODE_ARROW_RIGHT = 'ArrowRight'
const KEY_CODE_W = 'KeyW'
const KEY_CODE_S = 'KeyS'
const KEY_CODE_A = 'KeyA'
const KEY_CODE_D = 'KeyD'

const GameContainer: React.FC<TCanvasProps> = ({
  height,
  width,
  newGame,
  setScore,
}) => {
  const canvasRef = useRef(null)
  const gameRef = useRef<Game | null>(null)

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const { code } = event

    debug('code', code)

    if (gameRef.current) {
      switch (code) {
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

        setScore(currentScore)
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
    if (newGame && canvasRef.current && gameRef.current) {
      gameRef.current.restart()
    }
  }, [newGame])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return <canvas width={width} height={height} ref={canvasRef}></canvas>
}

export default GameContainer
