import { ProfileForm, withProtection } from '@containers'
import './styles.scss'

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h3>Профиль</h3>
      <ProfileForm />
    </div>
  )
}

export default withProtection(ProfilePage)
