import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Home from '../Home'
import Forum from '../Forum'
import Layout from '../Layout'
import Error from '../Error'
import { Routes } from './routes'
import { RegistrationPage } from '@pages/registration'
import { LoginPage } from '@pages/login'
import { RulesPage } from '@pages/rules'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={Routes.Forum} element={<Forum />} />
      <Route path={Routes.Registration} element={<RegistrationPage />} />
      <Route path={Routes.Login} element={<LoginPage />} />
      <Route path={Routes.Rules} element={<RulesPage />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
)

export * from './routes'
export default router
