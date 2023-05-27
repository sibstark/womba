import { NavLink, Outlet } from 'react-router-dom'
import Layout from '../../ui/components/Layout'

const RootLayout = () => {
  return (
    <>
      <header>
        <nav>
          <h1>WOMBA 2048</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/forum">Forum</NavLink>
        </nav>
      </header>
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}

export default RootLayout
