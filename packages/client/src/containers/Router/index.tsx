import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Home from '../Home'
import Login from '../Login'
import Forum from '../Forum'
import Layout from '../Layout'
import Error from '../Error'
import ProfilePage from '../../pages/Profile/profile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="forum" element={<Forum />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
)

export default router
