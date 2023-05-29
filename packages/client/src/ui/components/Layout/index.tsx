import React from 'react'

import './style.scss'

type TPropsLayout = {
  children: React.ReactNode
}
const Layout: React.FC<TPropsLayout> = ({ children }) => {
  return <div className="layout">{children}</div>
}

export default Layout
