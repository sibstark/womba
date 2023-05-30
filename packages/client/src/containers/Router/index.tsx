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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="forum" element={<Forum />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
)

export default router
