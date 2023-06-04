import React from 'react'
import classnames from 'classnames'
import './styles.scss'

type CardProps = React.HTMLAttributes<HTMLDivElement>
export const Card: React.FC<CardProps> = ({ className, ...rest }) => {
  const classes = classnames(className, 'card')
  return <div className={classes} {...rest} />
}
