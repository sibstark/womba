import React from 'react'
import { Button } from '@ui/components'
import { useFullscreenStatus } from '@utils'
import './styles.scss'

type THeaderProps = {
  score: number
  bestScore: number
  startNewGame: () => void
  onFullscreen: () => void
}

export const Header: React.FC<THeaderProps> = ({
  startNewGame,
  score,
  bestScore,
  onFullscreen,
}) => {
  const isFullscreen = useFullscreenStatus()

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
