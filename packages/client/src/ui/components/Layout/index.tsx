import React from 'react'
import './style.scss'

// TODO: There is PropsWithChildren in React types to define comp with children
type TLayoutProps = {
  children: React.ReactNode
}
const Layout: React.FC<TLayoutProps> = ({ children }) => {
  return <div className="layout">{children}</div>
}

export default Layout
