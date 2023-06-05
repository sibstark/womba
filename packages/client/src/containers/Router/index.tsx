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
import { Routes } from './routes'
import { RegistrationPage } from '../../pages/registration'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={Routes.Login} element={<Login />} />
      <Route path={Routes.Forum} element={<Forum />} />
      <Route path={Routes.Registration} element={<RegistrationPage />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
)

export * from './routes'
export default router
