import React, { useState } from 'react'
import { Button } from '@ui/components'
import './styles.scss'
import { useFullscreenStatus } from '@utils'

type HeaderProps = {
  onFullscreen: () => void
}
const defaultScore = 340
export const Header: React.FC<HeaderProps> = ({ onFullscreen }) => {
  const [score, setScore] = useState(defaultScore)
  const [bestScore] = useState(defaultScore)
  const isFullscreen = useFullscreenStatus()
  const startNewGame = () => {
    setScore(0)
  }

  return (
    <div className="header">
      <div className="header__block">
        <span className="header__block__title">Score</span>
        <div className="header__block__content">{score}</div>
      </div>
      <div className="header__block">
        <span className="header__block__title">Best</span>
        <div className="header__block__content">{bestScore}</div>
      </div>
      <div className="header__new">
        <Button className="header__new_button" onClick={startNewGame}>
          New Game
        </Button>
        {!isFullscreen && (
          <Button className="header__new_button" onClick={onFullscreen}>
            Full screen
          </Button>
        )}
      </div>
    </div>
  )
}
