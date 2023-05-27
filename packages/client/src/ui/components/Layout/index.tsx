import React from 'react'

import './style.scss'

type TProps = {
  children: React.ReactNode
}
const Layout: React.FC<TProps> = ({ children }) => {
  return <div className="layout">{children}</div>
}

export default Layout
