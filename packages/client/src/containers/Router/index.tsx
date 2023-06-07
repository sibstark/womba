import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Home from '../Home'
import Forum from '../Forum'
import Layout from '../Layout'
import { Routes } from './routes'
import { RegistrationPage } from '@pages/registration'
import { LoginPage } from '@pages/login'
import { ApplicationErrorPage } from '@pages/400'
import { ServerErrorPage } from '@pages/500'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={Routes.Forum} element={<Forum />} />
      <Route path={Routes.Registration} element={<RegistrationPage />} />
      <Route path={Routes.Login} element={<LoginPage />} />
      <Route
        path={Routes.ApplicationError}
        element={<ApplicationErrorPage />}
      />
      <Route path={Routes.ServerError} element={<ServerErrorPage />} />
    </Route>
  )
)

export * from './routes'
export default router
