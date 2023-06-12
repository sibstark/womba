import { useEffect, useState, useCallback } from 'react'
import debugResolve from '../../logger/debugResolve'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Footer } from './components/Footer'

import './styles.scss'

const debug = debugResolve('GamePage')

export const GamePage = () => {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [newGame, setNewGame] = useState(false)

  const startNewGame = useCallback(() => {
    setNewGame(true)

    setTimeout(() => {
      setNewGame(false)
    }, 100)
  }, [])

  const handleStartNewGame = useCallback(() => {
    debug('handleStartNewGame')

    setScore(0)

    startNewGame()
  }, [])

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
    }
  }, [score])

  return (
    <div className="container">
      <Header
        score={score}
        bestScore={bestScore}
        startNewGame={handleStartNewGame}
      />
      <Main setScore={setScore} newGame={newGame} />
      <Footer />
    </div>
  )
}
