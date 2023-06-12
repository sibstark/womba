import React from 'react'

import './styles.scss'

type THeaderProps = {
  score: number
  bestScore: number
  startNewGame: () => void
}

export const Header: React.FC<THeaderProps> = ({
  startNewGame,
  score,
  bestScore,
}) => {
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
        <button className="header__new_button" onClick={startNewGame}>
          New Game
        </button>
      </div>
    </div>
  )
}
