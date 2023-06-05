import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Home from '../Home'
import Layout from '../Layout'
import Error from '../Error'
import { Routes } from './routes'
import { RegistrationPage } from '@pages/registration'
import { LoginPage } from '@pages/login'
import { ForumPage } from '@pages/forum'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={Routes.Login} element={<LoginPage />} />
      <Route path={Routes.Forum} element={<ForumPage />} />
      <Route path={Routes.Registration} element={<RegistrationPage />} />
      <Route path={Routes.Login} element={<LoginPage />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
)

export * from './routes'
export default router
