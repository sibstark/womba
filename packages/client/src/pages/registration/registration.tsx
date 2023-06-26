import { RegistrationForm, withAnonymous } from '@containers'
import { Card } from '@ui/components'
import './styles.scss'

export const RegistrationPage = withAnonymous(() => {
  return (
    <Card className="registration-page">
      <h3>Регистрация</h3>
      <RegistrationForm />
    </Card>
  )
})
