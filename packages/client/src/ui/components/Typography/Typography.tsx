import React from 'react'
import './styles.scss'

interface TypographyProps {
  children: React.ReactNode
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  component,
}) => {
  const Tag = component

  return <Tag className={variant}>{children}</Tag>
}
