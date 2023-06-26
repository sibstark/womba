import { StartScreen } from '../../containers/StartScreen'
import { withProtection } from '@containers'
import './styles.scss'

export const StartPage = withProtection(() => {
  return <StartScreen />
})
