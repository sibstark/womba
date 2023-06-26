import { Card } from '@ui/components'
import { LoginForm, withAnonymous } from '@containers'
import './styles.scss'

export const LoginPage = withAnonymous(() => {
  return (
    <Card className="login-page">
      <h3>Вход</h3>
      <LoginForm />
    </Card>
  )
})
