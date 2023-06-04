import { NavLink, Outlet } from 'react-router-dom'
import Layout from '../../ui/components/Layout'

const RootLayout = () => {
  return (
    <>
      <header>
        <nav>
          <h1>WOMBA 2048</h1>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/login">Login</NavLink>
          <br />
          <NavLink to="/forum">Forum</NavLink>
          <br />
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </header>
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}

export default RootLayout
