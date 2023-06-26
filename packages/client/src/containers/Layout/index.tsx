import { NavLink, Outlet } from 'react-router-dom'
import Layout from '../../ui/components/Layout'
import { Routes } from '../router'
import { useEffect } from 'react'
import { loadUser, userInitialization } from '@redux/user'
import { dispatch } from '@redux/store'
import { useSelector } from 'react-redux'
import { Anonymous, Protection } from '@containers'
import './styles.scss'

const RootLayout = () => {
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  const fetching = useSelector(userInitialization)

  if (fetching) {
    return <div>Загрузка</div>
  }

  return (
    <>
      <header>
        <nav className="header-navigation">
          <h1>WOMBA 2048</h1>
          <Anonymous>
            <NavLink to={Routes.Login}>Login</NavLink>
            <NavLink to={Routes.Registration}>Registration</NavLink>
          </Anonymous>
          <Protection>
            <NavLink to="/">Home</NavLink>
            <NavLink to={Routes.Forum}>Forum</NavLink>
            <NavLink to={Routes.Profile}>Profile</NavLink>
            <NavLink to={Routes.LeaderBoard}>LeaderBoard</NavLink>
            <NavLink to={Routes.Start}>Start</NavLink>
            <NavLink to={Routes.Profile}>Profile</NavLink>
            <NavLink to={Routes.Rules}>Rules</NavLink>
            <NavLink to={Routes.Game}>Game</NavLink>
          </Protection>
        </nav>
      </header>
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}

export default RootLayout
