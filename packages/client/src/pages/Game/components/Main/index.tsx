import type { Dispatch, SetStateAction } from 'react'
import React from 'react'
import GameContainer from '../../../../containers/GameContainer'

import './styles.scss'

type TMainProps = {
  setScore: Dispatch<SetStateAction<number>>
}

export const Main: React.FC<TMainProps> = ({ setScore }) => {
  return <GameContainer height="400px" width="400px" setScore={setScore} />
}
