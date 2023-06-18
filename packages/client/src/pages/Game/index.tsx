import { Header } from './components/Header'
import { Main } from './components/Main'
import { Footer } from './components/Footer'
import { useRef } from 'react'
import { useFullScreen } from '@utils'
import './styles.scss'

export const GamePage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { onFullscreen } = useFullScreen(ref)
  return (
    <div ref={ref} className="container">
      <Header onFullscreen={onFullscreen} />
      <Main />
      <Footer />
    </div>
  )
}
