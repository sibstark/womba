import type { Dispatch, SetStateAction } from 'react'
import React from 'react'
import GameContainer from '../../../../containers/GameContainer'

import './styles.scss'

type TMainProps = {
  setScore: Dispatch<SetStateAction<number>>
  newGame: boolean
}

export const Main: React.FC<TMainProps> = ({ setScore, newGame }) => {
  return (
    <GameContainer
      height="400px"
      width="400px"
      newGame={newGame}
      setScore={setScore}
    />
  )
}
