import { useEffect, useState, useCallback } from 'react'
import debugResolve from '../../logger/debugResolve'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Footer } from './components/Footer'
import { useRef } from 'react'
import { useFullScreen } from '@utils'
import './styles.scss'
import { withProtection } from '@containers'

const debug = debugResolve('GamePage')

export const GamePage = withProtection(() => {
  const ref = useRef<HTMLDivElement>(null)
  const { onFullscreen } = useFullScreen(ref)
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
    <div ref={ref} className="container">
      <Header
        score={score}
        bestScore={bestScore}
        startNewGame={handleStartNewGame}
        onFullscreen={onFullscreen}
      />
      <Main setScore={setScore} newGame={newGame} />
      <Footer />
    </div>
  )
})
